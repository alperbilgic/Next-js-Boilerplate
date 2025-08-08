import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { account, session, user, verification } from '@/models/Schema';
import { db } from './DB';
import { Env } from './Env';

// Email sending function that's only imported when needed
const sendEmail = async (to: string, subject: string, html: string) => {
  // Dynamic import to avoid loading nodemailer in edge runtime
  const { createTransporter } = await import('./Email');
  const transporter = createTransporter();

  await transporter.sendMail({
    from: Env.SMTP_FROM,
    to,
    subject,
    html,
  });
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail(
        user.email,
        'Reset your password',
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Your Password</h2>
            <p>Hi ${user.name},</p>
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
      );
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(
        user.email,
        'Verify your email address',
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome! Please verify your email</h2>
            <p>Hi ${user.name},</p>
            <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
            </div>
            <p>If you didn't create an account, please ignore this email.</p>
            <p>This link will expire in 24 hours.</p>
          </div>
        `,
      );
    },
    sendOnSignUp: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret: Env.BETTER_AUTH_SECRET,
  baseURL: Env.BETTER_AUTH_URL,
  trustedOrigins: [Env.BETTER_AUTH_URL],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
