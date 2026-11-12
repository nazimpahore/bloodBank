import nodemailer from 'nodemailer';

export const OTP_EXPIRY_MINUTES = 5;

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getSmtpConfig = () => {
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || '').trim();
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || '';
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;
  const from = (process.env.EMAIL_FROM || process.env.SMTP_FROM || (user ? `LifeDrop Blood Bank <${user}>` : '')).trim();

  return { host, port, secure, user, pass, from };
};

let cachedTransporter = null;
let cachedKey = '';

const getTransporter = () => {
  const { host, port, secure, user, pass, from } = getSmtpConfig();

  if (!user || !pass) {
    const err = new Error(
      'Email service is not configured. Set SMTP_USER and SMTP_PASS in backend/.env to send OTP emails.'
    );
    err.status = 503;
    throw err;
  }

  const key = `${host}:${port}:${secure}:${user}:${pass}`;
  if (!cachedTransporter || cachedKey !== key) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    cachedKey = key;
  }

  return { transporter: cachedTransporter, from };
};

export const sendPasswordResetOtpEmail = async ({
  toEmail,
  recipientName,
  role,
  otp,
  expiresInMinutes = OTP_EXPIRY_MINUTES,
}) => {
  const { transporter, from } = getTransporter();

  const roleLabel = role === 'hospital' ? 'Hospital / Clinic' : 'User / Donor';
  const safeName = escapeHtml(recipientName || 'User');
  const safeRole = escapeHtml(roleLabel);
  const safeOtp = escapeHtml(otp);

  const subject = `LifeDrop Password Reset Code (Valid for ${expiresInMinutes} Minutes)`;

  const text = [
    `Hello ${recipientName || 'User'},`,
    '',
    `We received a password reset request for your LifeDrop ${roleLabel} account.`,
    '',
    `Your 6-digit verification code is: ${otp}`,
    '',
    `This code is valid for ${expiresInMinutes} minutes. Do not share it with anyone.`,
    '',
    'If you did not request a password reset, you can safely ignore this email.',
    '',
    '— LifeDrop Blood Bank Management System',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; color: #111827;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #dc2626; font-size: 22px;">LifeDrop Blood Bank</h2>
        <p style="margin: 4px 0 0; color: #6b7280; font-size: 13px;">Password Reset Verification</p>
      </div>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
        Hello <strong>${safeName}</strong>,
      </p>
      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 18px;">
        We received a request to reset the password for your <strong>${safeRole}</strong> account. Use the verification code below:
      </p>
      <div style="text-align: center; background-color: #fef2f2; border: 1px dashed #fca5a5; border-radius: 10px; padding: 16px; margin: 0 0 18px;">
        <span style="font-size: 30px; font-weight: bold; letter-spacing: 8px; color: #dc2626; font-family: monospace;">${safeOtp}</span>
      </div>
      <p style="font-size: 13px; color: #374151; margin: 0 0 12px;">
        This code is valid for <strong>${expiresInMinutes} minutes</strong>. For your security, please do not share this code with anyone.
      </p>
      <p style="font-size: 12px; color: #6b7280; margin: 18px 0 0; border-top: 1px solid #f3f4f6; padding-top: 12px;">
        If you did not request a password reset, you can safely ignore this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: toEmail,
    subject,
    text,
    html,
  });
};

