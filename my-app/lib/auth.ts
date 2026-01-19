/**
 * Authentication utility functions for client-side route protection
 */

export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
  companyId?: number;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('authToken');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  return !!(token && isLoggedIn);
}

/**
 * Get current user role
 */
export function getUserRole(): 'user' | 'admin' | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem('userRole') as 'user' | 'admin') || null;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  return getUserRole() === 'admin';
}

/**
 * Get auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

/**
 * Clear authentication data
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  
  // Clear auth tokens and login state
  localStorage.removeItem('authToken');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('isAdminLoggedIn');
  
  // Clear admin data
  localStorage.removeItem('adminCompany');
  localStorage.removeItem('adminName');
  localStorage.removeItem('adminEmail');
  
  // Clear user data
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  
  // Clear user preferences and saved data
  localStorage.removeItem('savedJobs');
  localStorage.removeItem('appliedJobs');
  localStorage.removeItem('userApplications');
  localStorage.removeItem('notificationSettings');
  localStorage.removeItem('privacySettings');
  localStorage.removeItem('userAccountData');
}

/**
 * Check if route requires authentication
 */
export function requiresAuth(pathname: string): boolean {
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/admin',
    '/super-admin',
  ];
  
  return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Check if route requires admin role
 */
export function requiresAdmin(pathname: string): boolean {
  const adminRoutes = [
    '/admin',
    '/super-admin',
  ];
  
  return adminRoutes.some(route => pathname.startsWith(route));
}

/**
 * Get redirect path based on user role
 */
export function getRedirectPath(role?: string | null): string {
  if (role === 'admin') {
    return '/admin';
  }
  return '/dashboard';
}


