import nodemailer from 'nodemailer';
import { Env } from './Env';

export function createTransporter() {
  return nodemailer.createTransport({
    host: Env.SMTP_HOST,
    port: Env.SMTP_PORT,
    secure: Env.SMTP_SECURE, // true for port 465 (SSL), false for other ports (587, 25)
    auth: {
      user: Env.SMTP_USER,
      pass: Env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}
