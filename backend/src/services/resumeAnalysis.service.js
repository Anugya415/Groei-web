import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { ResumeParserService } from './resumeParser.service.js';

export class ResumeAnalysisService {
  static async analyzeResume(filePath, fileType) {
    try {
      const text = await ResumeParserService.extractText(filePath, fileType);
      const parsedData = await ResumeParserService.parseWithAI(text);

      const analysis = {
        overallScore: 0,
        categories: {},
        suggestions: [],
        strengths: [],
        weaknesses: [],
      };

      let totalScore = 0;
      let categoryCount = 0;

      const keywordScore = this.analyzeKeywords(text, parsedData);
      analysis.categories.keywords = keywordScore;
      totalScore += keywordScore.score;
      categoryCount++;

      const formattingScore = this.analyzeFormatting(text);
      analysis.categories.formatting = formattingScore;
      totalScore += formattingScore.score;
      categoryCount++;

      const lengthScore = this.analyzeLength(text);
      analysis.categories.length = lengthScore;
      totalScore += lengthScore.score;
      categoryCount++;

      const skillsScore = this.analyzeSkills(parsedData);
      analysis.categories.skills = skillsScore;
      totalScore += skillsScore.score;
      categoryCount++;

      const structureScore = this.analyzeStructure(text);
      analysis.categories.structure = structureScore;
      totalScore += structureScore.score;
      categoryCount++;

      const contactScore = this.analyzeContactInfo(parsedData);
      analysis.categories.contact = contactScore;
      totalScore += contactScore.score;
      categoryCount++;

      analysis.overallScore = Math.round(totalScore / categoryCount);

      analysis.suggestions = [
        ...keywordScore.suggestions,
        ...formattingScore.suggestions,
        ...lengthScore.suggestions,
        ...skillsScore.suggestions,
        ...structureScore.suggestions,
        ...contactScore.suggestions,
      ].slice(0, 10);

      analysis.strengths = [
        ...keywordScore.strengths,
        ...formattingScore.strengths,
        ...skillsScore.strengths,
      ].slice(0, 5);

      analysis.weaknesses = [
        ...keywordScore.weaknesses,
        ...formattingScore.weaknesses,
        ...lengthScore.weaknesses,
        ...skillsScore.weaknesses,
      ].slice(0, 5);

      analysis.scrapedData = parsedData;

      return analysis;
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw error;
    }
  }

  static analyzeKeywords(text, parsedData) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    const commonKeywords = [
      'experience', 'skills', 'education', 'achievement', 'project',
      'leadership', 'team', 'collaboration', 'problem solving', 'communication',
      'technical', 'professional', 'certification', 'training', 'expertise'
    ];

    const techKeywords = [
      'javascript', 'python', 'java', 'react', 'node', 'sql', 'database',
      'api', 'git', 'agile', 'scrum', 'devops', 'cloud', 'aws', 'azure'
    ];

    const lowerText = text.toLowerCase();
    let keywordCount = 0;
    let techKeywordCount = 0;

    commonKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        keywordCount++;
      }
    });

    techKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        techKeywordCount++;
      }
    });

    const keywordDensity = (keywordCount + techKeywordCount) / text.split(/\s+/).length * 100;

    if (keywordDensity > 2) {
      result.score = 95;
      result.strengths.push('Excellent keyword usage');
    } else if (keywordDensity > 1) {
      result.score = 80;
      result.strengths.push('Good keyword coverage');
    } else if (keywordDensity > 0.5) {
      result.score = 65;
      result.weaknesses.push('Could use more relevant keywords');
    } else {
      result.score = 45;
      result.weaknesses.push('Low keyword density');
    }

    if (techKeywordCount < 3 && parsedData.skills && parsedData.skills.length > 0) {
      result.suggestions.push('Add more technical keywords related to your skills');
    }

    if (keywordDensity < 1) {
      result.suggestions.push('Include more industry-specific keywords to improve ATS compatibility');
    }

    return result;
  }

  static analyzeFormatting(text) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    const hasSections = /(experience|education|skills|summary|objective|projects)/i.test(text);
    const hasBulletPoints = /[•\-\*]\s/.test(text) || /\d+\.\s/.test(text);
    const hasDates = /\d{4}/.test(text);
    const hasEmail = /[\w\.-]+@[\w\.-]+\.\w+/.test(text);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(text);

    let score = 0;
    if (hasSections) {
      score += 20;
      result.strengths.push('Well-organized sections');
    } else {
      result.weaknesses.push('Missing clear section headers');
      result.suggestions.push('Add clear section headers (Experience, Education, Skills)');
    }

    if (hasBulletPoints) {
      score += 20;
      result.strengths.push('Good use of bullet points');
    } else {
      result.weaknesses.push('Limited use of bullet points');
      result.suggestions.push('Use bullet points to highlight achievements');
    }

    if (hasDates) {
      score += 15;
    } else {
      result.suggestions.push('Include dates for work experience and education');
    }

    if (hasEmail && hasPhone) {
      score += 15;
      result.strengths.push('Complete contact information');
    } else {
      result.weaknesses.push('Missing contact information');
      result.suggestions.push('Ensure email and phone number are included');
    }

    const lineCount = text.split('\n').length;
    if (lineCount > 20 && lineCount < 100) {
      score += 15;
    } else if (lineCount < 10) {
      score += 5;
      result.weaknesses.push('Resume appears too short');
    }

    const hasConsistentFormatting = /^[A-Z]/.test(text.split('\n').filter(l => l.trim()).slice(0, 5).join(''));
    if (hasConsistentFormatting) {
      score += 15;
    } else {
      result.suggestions.push('Ensure consistent capitalization and formatting');
    }

    result.score = Math.min(score, 100);

    return result;
  }

  static analyzeLength(text) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    const wordCount = text.split(/\s+/).length;
    const pageCount = Math.ceil(wordCount / 250);

    if (pageCount === 1) {
      result.score = 90;
      result.strengths.push('Optimal length (1 page)');
    } else if (pageCount === 2) {
      result.score = 85;
      result.strengths.push('Good length (2 pages)');
    } else if (pageCount === 3) {
      result.score = 70;
      result.suggestions.push('Consider condensing to 2 pages if possible');
    } else if (pageCount > 3) {
      result.score = 50;
      result.weaknesses.push('Resume is too long');
      result.suggestions.push('Condense resume to 2 pages maximum');
    } else {
      result.score = 60;
      result.weaknesses.push('Resume may be too short');
      result.suggestions.push('Add more details about your experience and achievements');
    }

    return result;
  }

  static analyzeSkills(parsedData) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    if (!parsedData.skills) {
      result.score = 30;
      result.weaknesses.push('No skills section found');
      result.suggestions.push('Add a dedicated skills section');
      return result;
    }

    const skills = Array.isArray(parsedData.skills) ? parsedData.skills : [parsedData.skills];
    const skillCount = skills.length;

    if (skillCount >= 10) {
      result.score = 95;
      result.strengths.push('Comprehensive skills list');
    } else if (skillCount >= 6) {
      result.score = 80;
      result.strengths.push('Good skills representation');
    } else if (skillCount >= 3) {
      result.score = 65;
      result.suggestions.push('Consider adding more relevant skills');
    } else {
      result.score = 45;
      result.weaknesses.push('Limited skills listed');
      result.suggestions.push('Add more skills to showcase your expertise');
    }

    const hasTechSkills = skills.some(skill =>
      typeof skill === 'string' &&
      /(javascript|python|java|react|node|sql|html|css|typescript|vue|angular)/i.test(skill)
    );

    if (hasTechSkills) {
      result.strengths.push('Technical skills well represented');
    } else if (skillCount > 0) {
      result.suggestions.push('Consider adding technical skills if applicable');
    }

    return result;
  }

  static analyzeStructure(text) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    const sections = {
      header: /^(name|contact|email|phone)/i.test(text.split('\n')[0]),
      summary: /(summary|objective|profile|about)/i.test(text),
      experience: /(experience|work|employment|professional)/i.test(text),
      education: /(education|qualification|degree|university|college)/i.test(text),
      skills: /(skills|technical|competencies)/i.test(text),
    };

    const sectionCount = Object.values(sections).filter(Boolean).length;

    if (sectionCount >= 5) {
      result.score = 95;
      result.strengths.push('Complete resume structure');
    } else if (sectionCount >= 4) {
      result.score = 80;
      result.strengths.push('Well-structured resume');
    } else if (sectionCount >= 3) {
      result.score = 65;
      result.suggestions.push('Add missing sections for better structure');
    } else {
      result.score = 45;
      result.weaknesses.push('Incomplete resume structure');
    }

    if (!sections.summary) {
      result.suggestions.push('Add a professional summary or objective');
    }

    if (!sections.experience) {
      result.suggestions.push('Include work experience section');
    }

    if (!sections.education) {
      result.suggestions.push('Add education section');
    }

    return result;
  }

  static analyzeContactInfo(parsedData) {
    const result = {
      score: 0,
      suggestions: [],
      strengths: [],
      weaknesses: [],
    };

    let score = 0;

    if (parsedData.name) {
      score += 25;
      result.strengths.push('Name included');
    } else {
      result.weaknesses.push('Name not found');
      result.suggestions.push('Ensure your name is clearly displayed');
    }

    if (parsedData.email) {
      score += 25;
      result.strengths.push('Email address included');
    } else {
      result.weaknesses.push('Email not found');
      result.suggestions.push('Add your email address');
    }

    if (parsedData.phone) {
      score += 25;
      result.strengths.push('Phone number included');
    } else {
      result.weaknesses.push('Phone number not found');
      result.suggestions.push('Add your phone number');
    }

    if (parsedData.linkedin || parsedData.github || parsedData.portfolio) {
      score += 25;
      result.strengths.push('Professional links included');
    } else {
      result.suggestions.push('Consider adding LinkedIn, GitHub, or portfolio links');
    }

    result.score = score;

    return result;
  }
}
