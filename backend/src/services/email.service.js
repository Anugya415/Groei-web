import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Persistent transporter instance
let transporterInstance = null;

/**
 * Get or create transporter
 */
const getTransporter = () => {
  if (transporterInstance) return transporterInstance;

  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
    },
  };

  // Optimization for Gmail
  if (config.host.includes('gmail.com')) {
    config.service = 'gmail';
    // When using service: 'gmail', host and port are handled by nodemailer
    delete config.host;
    delete config.port;
  }

  transporterInstance = nodemailer.createTransport(config);
  return transporterInstance;
};

/**
 * Verify transporter configuration
 */
export const verifyEmailConfig = async () => {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    console.log('✅ Email server is ready to send messages');
    return true;
  } catch (err) {
    const error = err || new Error('Unknown email config error');
    console.warn('⚠️  Email configuration error:', error.message || error);
    console.warn('⚠️  Email functionality may not work. Please configure SMTP settings in .env');
    transporterInstance = null; // Reset if failed
    return false;
  }
};

// Email templates
const emailTemplates = {
  verification: (data) => ({
    subject: 'Verify Your Email - GROEI',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to GROEI!</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name || 'User'}!</h2>
            <p>Thank you for signing up for GROEI. Please verify your email address to complete your registration and start exploring job opportunities.</p>
            <p style="text-align: center;">
              <a href="${data.url}" class="button">Verify Email Address</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6366f1;">${data.url}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account with GROEI, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} GROEI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to GROEI!
      
      Hello ${data.name || 'User'}!
      
      Thank you for signing up for GROEI. Please verify your email address to complete your registration.
      
      Click this link to verify your email: ${data.url}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with GROEI, please ignore this email.
      
      © ${new Date().getFullYear()} GROEI. All rights reserved.
    `,
  }),

  passwordReset: (data) => ({
    subject: 'Reset Your Password - GROEI',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name || 'User'}!</h2>
            <p>We received a request to reset your password for your GROEI account.</p>
            <p style="text-align: center;">
              <a href="${data.url}" class="button">Reset Password</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6366f1;">${data.url}</p>
            <div class="warning">
              <strong>Important:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
            </div>
            <p>For security reasons, if you didn't request this password reset, please contact support immediately.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} GROEI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Password Reset Request
      
      Hello ${data.name || 'User'}!
      
      We received a request to reset your password for your GROEI account.
      
      Click this link to reset your password: ${data.url}
      
      This link will expire in 1 hour.
      
      If you didn't request a password reset, please ignore this email and your password will remain unchanged.
      
      © ${new Date().getFullYear()} GROEI. All rights reserved.
    `,
  }),

  otp: (data) => ({
    subject: 'Your Verification Code - GROEI',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { color: white; margin: 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6366f1; text-align: center; margin: 20px 0; background: #e0e7ff; padding: 15px; border-radius: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verification Code</h1>
            </div>
            <div class="content">
              <h2>Hello ${data.name || 'User'}!</h2>
              <p>Use the following code to complete your registration with GROEI. This code is valid for 10 minutes.</p>
              <div class="otp-code">${data.otp}</div>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} GROEI. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Your Verification Code - GROEI
      
      Hello ${data.name || 'User'}!

      Use the following code to complete your registration with GROEI:
      
      ${data.otp}
      
      This code is valid for 10 minutes.
      
      © ${new Date().getFullYear()} GROEI. All rights reserved.
    `,
  }),

  interview: (data) => ({
    subject: `Interview Scheduled: ${data.jobTitle} at ${data.companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white; margin: 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .details { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0; }
          .detail-row { margin-bottom: 10px; }
          .detail-label { font-weight: bold; color: #6b7280; width: 100px; display: inline-block; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Interview Scheduled</h1>
          </div>
          <div class="content">
            <h2>Hello ${data.name || 'User'}!</h2>
            <p>Great news! Your application for the <strong>${data.jobTitle}</strong> position at <strong>${data.companyName}</strong> has moved forward, and an interview has been scheduled.</p>
            
            <div class="details">
              <div class="detail-row"><span class="detail-label">Date:</span> ${data.date}</div>
              <div class="detail-row"><span class="detail-label">Type:</span> ${data.type}</div>
              <div class="detail-row"><span class="detail-label">Location:</span> ${data.location}</div>
              ${data.notes ? `<div class="detail-row"><span class="detail-label">Notes:</span> ${data.notes}</div>` : ''}
            </div>
            
            <p>You can view more details and manage your interviews in your dashboard.</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/interviews" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; border-radius: 5px;">View Interviews</a>
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} GROEI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Interview Scheduled
      
      Hello ${data.name || 'User'}!
      
      Your application for ${data.jobTitle} at ${data.companyName} has progressed to the interview stage.
      
      Interview Details:
      Date: ${data.date}
      Type: ${data.type}
      Location: ${data.location}
      ${data.notes ? `Notes: ${data.notes}` : ''}
      
      View details in your dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/interviews
      
      © ${new Date().getFullYear()} GROEI. All rights reserved.
    `,
  }),
};

/**
 * Send email
 */
export const sendEmail = async (to, templateName, templateData) => {
  try {
    const transporter = getTransporter();

    // Check if email is configured
    if (!process.env.SMTP_USER && !process.env.EMAIL_USER) {
      console.warn('⚠️  Email not configured. Skipping email send.');
      return { success: false, error: 'Email not configured' };
    }

    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    const { subject, html, text } = template(templateData);

    const mailOptions = {
      from: `"GROEI" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email [${templateName}] sent to ${to}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    const error = err || new Error('Unknown email error');
    console.error(`❌ Email [${templateName}] send error:`, error.message || error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
};

/**
 * Send verification email
 */
export const sendVerificationEmail = async (email, name, token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

  return await sendEmail(email, 'verification', {
    name,
    url: verificationUrl,
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email, name, token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

  return await sendEmail(email, 'passwordReset', {
    name,
    url: resetUrl,
  });
};

/**
 * Send OTP email
 */
export const sendOTP = async (email, name, otp) => {
  return await sendEmail(email, 'otp', {
    name,
    otp,
  });
};

/**
 * Send interview scheduling email
 */
export const sendInterviewEmail = async (email, name, interviewData) => {
  return await sendEmail(email, 'interview', {
    name,
    ...interviewData,
  });
};
