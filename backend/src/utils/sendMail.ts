/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import config from '../config/config.js';
import logger from '../config/logger.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  // Specify the SMTP server host
  host: config.mail.host,

  // Specify the port number for the SMTP server (465 for SSL/TLS)
  port: config.mail.port,

  // Enable secure connection using SSL/TLS
  secure: true,

  // Provide authentication credentials for the SMTP server
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },

  tls: {
    rejectUnauthorized: true, // set to false only for local/test environments
  },
});

// render an ejs email template
const renderEmailTemplate = async (
  templateName: string,
  data: Record<string, any>,
): Promise<string> => {
  const templatePath = path.join(
    process.cwd(),
    'src',
    'utils',
    'emailTemplates',
    `${templateName}.ejs`,
  );

  return ejs.renderFile(templatePath, data);
};

// send an email using nodemailer
export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>,
) => {
  try {
    const html = await renderEmailTemplate(templateName, data);

    await transporter.sendMail({
      from: `<${config.mail.user}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    logger.error('Error sending email', error);
    return false;
  }
};
