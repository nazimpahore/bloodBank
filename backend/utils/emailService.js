import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

export const OTP_EXPIRY_MINUTES = 5;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '..', '.env');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getSmtpConfig = () => {
  let fileEnv = {};
  if (fs.existsSync(envPath)) {
    fileEnv = dotenv.parse(fs.readFileSync(envPath));
  }

  const readVar = (key) => fileEnv[key] || process.env[key] || '';

  const user = (readVar('SMTP_USER') || readVar('EMAIL_USER')).trim();
  const pass = (readVar('SMTP_PASS') || readVar('EMAIL_PASS')).trim();
  const host = (readVar('SMTP_HOST') || 'smtp.gmail.com').trim();
  const port = Number(readVar('SMTP_PORT') || 587);
  const secureEnv = readVar('SMTP_SECURE');
  // Prevent TLS/STARTTLS mismatch hangs on standard SMTP ports (465 = SSL, 587 = STARTTLS)
  const secure =
    port === 465
      ? true
      : port === 587
        ? false
        : secureEnv !== ''
          ? secureEnv === 'true'
          : false;
  const from = (readVar('EMAIL_FROM') || readVar('SMTP_FROM') || (user ? `LifeDrop Blood Bank <${user}>` : '')).trim();

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
      connectionTimeout: 6000,
      greetingTimeout: 6000,
      socketTimeout: 8000,
    });
    cachedKey = key;
  }

  return { transporter: cachedTransporter, from };
};

const sendEmail = async ({ to, subject, text, html }) => {
  const { transporter, from } = getTransporter();
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

const buildBrandedLayout = ({ subtitle, bodyHtml, footerNote }) => `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; color: #111827;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="margin: 0; color: #dc2626; font-size: 22px;">LifeDrop Blood Bank</h2>
      <p style="margin: 4px 0 0; color: #6b7280; font-size: 13px;">${escapeHtml(subtitle)}</p>
    </div>
    ${bodyHtml}
    <p style="font-size: 12px; color: #6b7280; margin: 20px 0 0; border-top: 1px solid #f3f4f6; padding-top: 12px;">
      ${escapeHtml(footerNote)}
    </p>
  </div>
`;

const NOTIFICATION_TONES = {
  accepted: {
    bg: '#ecfdf5',
    border: '#a7f3d0',
    title: '#065f46',
    text: '#047857',
  },
  request: {
    bg: '#fff7ed',
    border: '#fed7aa',
    title: '#9a3412',
    text: '#c2410c',
  },
};

const sendNotificationEmail = async ({
  toEmail,
  recipientName,
  subtitle,
  subject,
  headline,
  summaryText,
  detailsTitle,
  details,
  instructions,
  tone = 'accepted',
}) => {
  const safeName = escapeHtml(recipientName || 'User');
  const safeHeadline = escapeHtml(headline);
  const palette = NOTIFICATION_TONES[tone] || NOTIFICATION_TONES.accepted;

  const detailsRowsHtml = details
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 6px 10px; font-size: 13px; color: #6b7280; font-weight: bold; width: 36%; border-bottom: 1px solid #f3f4f6;">${escapeHtml(label)}</td>
          <td style="padding: 6px 10px; font-size: 13px; color: #111827; border-bottom: 1px solid #f3f4f6;">${escapeHtml(value)}</td>
        </tr>
      `
    )
    .join('');

  const instructionsHtml = instructions
    .map((step) => `<li style="margin-bottom: 6px;">${escapeHtml(step)}</li>`)
    .join('');

  const bodyHtml = `
    <p style="font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
      Hello <strong>${safeName}</strong>,
    </p>
    <div style="background-color: ${palette.bg}; border: 1px solid ${palette.border}; border-radius: 10px; padding: 14px 16px; margin: 0 0 18px;">
      <p style="margin: 0; font-size: 14px; font-weight: bold; color: ${palette.title};">${safeHeadline}</p>
      <p style="margin: 6px 0 0; font-size: 13px; color: ${palette.text}; line-height: 1.5;">${escapeHtml(summaryText)}</p>
    </div>
    <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #374151; margin: 0 0 8px;">${escapeHtml(detailsTitle)}</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 0 0 18px; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
      ${detailsRowsHtml}
    </table>
    <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 6px; padding: 14px 16px;">
      <h3 style="font-size: 14px; color: #991b1b; margin: 0 0 8px;">Next Steps &amp; Instructions</h3>
      <ol style="margin: 0; padding-left: 18px; font-size: 13px; color: #374151; line-height: 1.6;">
        ${instructionsHtml}
      </ol>
    </div>
  `;

  const text = [
    `Hello ${recipientName || 'User'},`,
    '',
    headline,
    summaryText,
    '',
    `${detailsTitle}:`,
    ...details.filter(([, value]) => value).map(([label, value]) => `- ${label}: ${value}`),
    '',
    'Next Steps & Instructions:',
    ...instructions.map((step, index) => `${index + 1}. ${step}`),
    '',
    '— LifeDrop Blood Bank Management System',
  ].join('\n');

  const html = buildBrandedLayout({
    subtitle,
    bodyHtml,
    footerNote: 'This is an automated notification from LifeDrop Blood Bank Management System.',
  });

  await sendEmail({ to: toEmail, subject, text, html });
};

export const sendPasswordResetOtpEmail = async ({
  toEmail,
  recipientName,
  role,
  otp,
  expiresInMinutes = OTP_EXPIRY_MINUTES,
}) => {
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

  const bodyHtml = `
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
  `;

  const html = buildBrandedLayout({
    subtitle: 'Password Reset Verification',
    bodyHtml,
    footerNote: 'If you did not request a password reset, you can safely ignore this email.',
  });

  await sendEmail({ to: toEmail, subject, text, html });
};

export const sendBloodRequestAcceptedEmail = async ({
  toEmail,
  userName,
  bloodGroup,
  hospital,
  requestId,
}) => {
  const hospitalName = hospital?.hname || 'Partner Hospital';
  const hospitalCity = hospital?.hcity || '';
  const hospitalPhone = hospital?.hphone || '';
  const hospitalEmail = hospital?.hemail || '';

  const instructions = [
    `Contact ${hospitalName} as soon as possible${hospitalPhone ? ` at ${hospitalPhone}` : ''}${hospitalEmail ? ` (${hospitalEmail})` : ''} to confirm blood unit availability and pickup/admission timing.`,
    'Visit the hospital blood bank desk with a valid Government Photo ID / CNIC and the patient’s doctor requisition slip or admission record.',
    'Bring a fresh patient blood sample (if requested by the hospital lab) for blood group verification and cross-matching prior to transfusion.',
    'Coordinate directly with the blood bank staff on arrival regarding any hospital verification or replacement donor requirements.',
  ];

  await sendNotificationEmail({
    toEmail,
    recipientName: userName,
    subtitle: 'Blood Request Accepted',
    subject: `Your ${bloodGroup} Blood Request Has Been Accepted — ${hospitalName}`,
    headline: `Request Accepted: ${bloodGroup} Blood Unit`,
    summaryText: `Good news! ${hospitalName} has accepted your blood request for group ${bloodGroup}. Please follow the instructions below to proceed.`,
    detailsTitle: 'Hospital Contact & Request Details',
    details: [
      ['Hospital Name', hospitalName],
      ['City', hospitalCity],
      ['Phone', hospitalPhone],
      ['Email', hospitalEmail],
      ['Blood Group', bloodGroup],
      ['Request ID', requestId ? String(requestId) : ''],
    ],
    instructions,
    tone: 'accepted',
  });
};

export const sendDonorInquiryAcceptedEmail = async ({
  toEmail,
  hospitalName,
  bloodGroup,
  donor,
  inquiryId,
}) => {
  const donorName = donor?.rname || 'Voluntary Donor';
  const donorCity = donor?.rcity || '';
  const donorPhone = donor?.rphone || '';
  const donorEmail = donor?.remail || '';

  const instructions = [
    `Contact the donor promptly${donorPhone ? ` at ${donorPhone}` : ''}${donorEmail ? ` (${donorEmail})` : ''} to confirm availability and schedule a donation slot.`,
    'Share your blood bank’s exact counter location, visiting hours, and arrival instructions with the donor.',
    'Perform standard pre-donation medical screening (photo ID check, hemoglobin, blood pressure, and WHO eligibility verification) upon arrival.',
    'Advise the donor to stay hydrated, have a light meal before donating, and bring a valid Government Photo ID.',
  ];

  await sendNotificationEmail({
    toEmail,
    recipientName: hospitalName,
    subtitle: 'Donor Request Accepted',
    subject: `Donor Accepted Your ${bloodGroup} Blood Request — ${donorName}`,
    headline: `Donor Accepted: ${bloodGroup} Blood Donation`,
    summaryText: `${donorName} has accepted your blood donation inquiry for blood group ${bloodGroup}. Please follow the instructions below to coordinate the donation.`,
    detailsTitle: 'Donor Contact & Request Details',
    details: [
      ['Donor Name', donorName],
      ['Blood Group', bloodGroup],
      ['City', donorCity],
      ['Phone', donorPhone],
      ['Email', donorEmail],
      ['Inquiry ID', inquiryId ? String(inquiryId) : ''],
    ],
    instructions,
    tone: 'accepted',
  });
};

export const sendNewBloodRequestEmail = async ({
  toEmail,
  hospitalName,
  bloodGroup,
  requester,
  requestId,
}) => {
  const requesterName = requester?.rname || 'A Patient / User';
  const requesterCity = requester?.rcity || '';
  const requesterPhone = requester?.rphone || '';
  const requesterEmail = requester?.remail || '';

  const instructions = [
    'Log in to your LifeDrop Hospital Dashboard and open the Patient Requests section.',
    `Check your blood inventory for ${bloodGroup} unit availability.`,
    'Click Accept or Decline on the request so the user receives an automatic email update.',
    `For urgent coordination, contact the requester directly${requesterPhone ? ` at ${requesterPhone}` : ''}${requesterEmail ? ` (${requesterEmail})` : ''}.`,
  ];

  await sendNotificationEmail({
    toEmail,
    recipientName: hospitalName,
    subtitle: 'New Blood Request Received',
    subject: `New ${bloodGroup} Blood Request Received — ${requesterName}`,
    headline: `New Blood Request: ${bloodGroup} Blood Unit`,
    summaryText: `${requesterName} has sent a blood request for blood group ${bloodGroup} to ${hospitalName || 'your hospital'}. Please review and respond as soon as possible.`,
    detailsTitle: 'Requester Contact & Request Details',
    details: [
      ['Requester Name', requesterName],
      ['Blood Group Needed', bloodGroup],
      ['City', requesterCity],
      ['Phone', requesterPhone],
      ['Email', requesterEmail],
      ['Request ID', requestId ? String(requestId) : ''],
    ],
    instructions,
    tone: 'request',
  });
};

export const sendNewDonorInquiryEmail = async ({
  toEmail,
  donorName,
  bloodGroup,
  hospital,
  inquiryId,
}) => {
  const hospitalName = hospital?.hname || 'A Partner Hospital';
  const hospitalCity = hospital?.hcity || '';
  const hospitalPhone = hospital?.hphone || '';
  const hospitalEmail = hospital?.hemail || '';

  const instructions = [
    'Log in to your LifeDrop User / Donor Dashboard and open your Donation Inquiries list.',
    `Check if you are eligible and available to donate ${bloodGroup} blood.`,
    'Click Accept if you can donate (the hospital will receive an email with your contact details), or Decline if you are currently unavailable.',
    `To coordinate directly, contact ${hospitalName}${hospitalPhone ? ` at ${hospitalPhone}` : ''}${hospitalEmail ? ` (${hospitalEmail})` : ''}.`,
  ];

  await sendNotificationEmail({
    toEmail,
    recipientName: donorName,
    subtitle: 'Blood Donation Request',
    subject: `Urgent ${bloodGroup} Blood Donation Request from ${hospitalName}`,
    headline: `Blood Donation Request: ${bloodGroup}`,
    summaryText: `${hospitalName} has requested ${bloodGroup} blood from you through the LifeDrop Voluntary Donor directory. Your response can help save a life.`,
    detailsTitle: 'Hospital Contact & Inquiry Details',
    details: [
      ['Hospital Name', hospitalName],
      ['Blood Group Needed', bloodGroup],
      ['City', hospitalCity],
      ['Phone', hospitalPhone],
      ['Email', hospitalEmail],
      ['Inquiry ID', inquiryId ? String(inquiryId) : ''],
    ],
    instructions,
    tone: 'request',
  });
};
