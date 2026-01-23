import { clearAuthCookies } from './cookies';

const API_BASE_URL = '/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Reduced to 10s

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        let errorData: any = null;

        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Request failed with status ${response.status}` };
        }

        const errorMessage = errorData.errors && Array.isArray(errorData.errors)
          ? errorData.errors.map((e: any) => e.msg || e.message || e.param).join(', ')
          : errorData.error || errorData.message || `Request failed with status ${response.status}`;

        const error = new Error(errorMessage);
        (error as any).status = response.status;
        (error as any).data = errorData;
        (error as any).isApiError = true;
        throw error;
      }


      const contentType = response.headers.get('content-type') || '';
      let responseData: any;

      try {
        const responseText = await response.text();

        if (!responseText || responseText.trim() === '') {
          responseData = {};
        } else if (contentType.includes('application/json')) {
          responseData = JSON.parse(responseText);
        } else {
          try {
            responseData = JSON.parse(responseText);
          } catch {
            responseData = responseText;
          }
        }
      } catch (parseError: any) {
        console.error('Error parsing response:', parseError, 'Content-Type:', contentType);
        throw new Error(`Failed to parse server response: ${parseError.message}`);
      }

      return responseData as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout. The server is taking too long to respond. Please check your connection and the backend status.');
      }

      if (error.isApiError) {
        throw error;
      }
      if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        throw new Error('Unable to connect to server. Please ensure the backend is running at http://localhost:8080');
      }
      if (error.message && !error.message.includes('API request failed')) {
        throw error;
      }
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

export const authAPI = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    company?: string;
  }) => {
    const response = await api.post<{
      message: string;
      token: string;
      user: any;
    }>('/auth/signup', data);
    api.setToken(response.token);
    return response;
  },

  sendOtp: async (email: string, name?: string) => {
    return api.post<{ message: string }>("/auth/send-otp", { email, name });
  },

  verifyOtp: async (email: string, otp: string) => {
    return api.post<{ message: string }>("/auth/verify-otp", { email, otp });
  },

  login: async (email: string, password: string) => {
    const response = await api.post<{
      message: string;
      token: string;
      user: any;
    }>('/auth/login', { email, password });
    api.setToken(response.token);
    return response;
  },

  getProfile: async () => {
    return api.get<{ user: any }>('/auth/profile');
  },

  updateProfile: async (data: any) => {
    return api.put<{ user: any; message: string }>('/auth/profile', data);
  },

  logout: () => {
    api.setToken(null);
    if (typeof window !== 'undefined') {
      // Clear all indicators
      localStorage.clear();
      // Clear cookies
      clearAuthCookies();
    }
  },

  verifyEmail: async (token: string) => {
    return api.get<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`);
  },

  resendVerification: async (email: string) => {
    return api.post<{ message: string }>('/auth/resend-verification', { email });
  },

  forgotPassword: async (email: string) => {
    return api.post<{ message: string }>('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string) => {
    return api.post<{ message: string }>('/auth/reset-password', { token, password });
  },
};

export const jobsAPI = {
  getAll: async (params?: {
    search?: string;
    location?: string;
    type?: string;
    company_id?: number;
    status?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    const query = queryParams.toString();
    return api.get<{ jobs: any[] }>(`/jobs${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return api.get<{ job: any }>(`/jobs/${id}`);
  },

  create: async (data: any) => {
    return api.post<{ job: any; message: string }>('/jobs', data);
  },

  getCompanyJobs: async () => {
    return api.get<{ jobs: any[] }>('/jobs/company/my');
  },

  getSuggestions: async () => {
    return api.get<{ jobs: any[]; userSkills: string[] }>('/jobs/suggestions');
  },

  update: async (id: number, data: any) => api.put<{ job: any; message: string }>(`/jobs/${id}`, data),
  delete: async (id: number) => api.delete<{ message: string }>(`/jobs/${id}`),
  save: async (id: number) => api.post<{ message: string }>(`/jobs/${id}/save`, {}),
  unsave: async (id: number) => api.delete<{ message: string }>(`/jobs/${id}/unsave`),
  getSaved: async () => api.get<{ jobs: any[] }>('/jobs/saved/my'),
};

export const applicationsAPI = {
  create: async (data: { job_id: number; cover_letter?: string; resume_url?: string }) => {
    return api.post<{ application: any; message: string }>('/applications', data);
  },

  getMyApplications: async () => {
    return api.get<{ applications: any[] }>('/applications/my');
  },

  getCompanyApplications: async (params?: { status?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    const query = queryParams.toString();
    return api.get<{ applications: any[] }>(`/applications/company${query ? `?${query}` : ''}`);
  },

  updateStatus: async (id: number, data: {
    status: string;
    notes?: string;
    interview_date?: string;
    interview_type?: string;
    interview_location?: string;
    interview_link?: string;
  }) => {
    return api.put<{ application: any; message: string }>(`/applications/${id}/status`, data);
  },
};

export const interviewsAPI = {
  getMyInterviews: async () => {
    return api.get<{ interviews: any[] }>('/interviews/my');
  },

  getById: async (id: number) => {
    return api.get<{ interview: any }>(`/interviews/${id}`);
  },
};

export const companiesAPI = {
  getAll: async () => {
    return api.get<{ companies: any[] }>('/companies');
  },

  getById: async (id: number) => {
    return api.get<{ company: any }>(`/companies/${id}`);
  },

  getMyCompany: async () => {
    return api.get<{ company: any }>('/companies/my/company');
  },

  updateMyCompany: async (data: any) => {
    return api.put<{ company: any; message: string }>('/companies/my/company', data);
  },
};

export const adminAPI = {
  getDashboard: async () => {
    return api.get<{ stats: any; recent_applications: any[] }>('/admin/dashboard');
  },

  getSettings: async () => {
    return api.get<{ settings: any }>('/admin/settings');
  },

  updateSettings: async (data: any) => {
    return api.put<{ settings: any; message: string }>('/admin/settings', data);
  },
};

export const analyticsAPI = {
  getCompanyAnalytics: async (params?: { start_date?: string; end_date?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    const query = queryParams.toString();
    return api.get<{ daily_analytics: any[]; status_distribution: any[] }>(`/analytics/company${query ? `?${query}` : ''}`);
  },
};

export const resumeAPI = {
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const response = await fetch(`${API_BASE_URL}/resumes/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to upload resume' }));
      throw new Error(errorData.error || 'Failed to upload resume');
    }

    return response.json();
  },

  getMyResumes: async () => {
    return api.get<{ resumes: any[] }>('/resumes/my');
  },

  deleteResume: async (id: number) => {
    return api.delete<{ message: string }>(`/resumes/${id}`);
  },

  analyzeResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch(`${API_BASE_URL}/resume-analysis/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to analyze resume' }));
      throw new Error(errorData.error || 'Failed to analyze resume');
    }

    return response.json();
  },
};
