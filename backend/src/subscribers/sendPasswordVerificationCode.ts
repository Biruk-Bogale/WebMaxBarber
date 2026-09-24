import { sendEmail } from '../utils/sendMail.js';

const sendPasswordVerificationCode = async (
  email: string,
  template: string,
  name: string,
  otp: string,
  title: string,
) => {
  await sendEmail(email, title, template, { name, otp });
};

export default sendPasswordVerificationCode;
