import { sendEmail } from '../utils/sendMail.js';

export interface InquiryEmailData {
  companyName: string;
  inquiryType: string;
  message: string;
  telephone: string;
  companyEmail: string;
  personalName: string;
  messageId: string;
}

const sendToMultipleEmail = async (
  //
  email: string[],
  template: string,
  data: InquiryEmailData,
) => {
  for (const recipient of email) {
    await sendEmail(
      //
      recipient,
      data.inquiryType,
      template,
      data,
    );
  }
};

export default sendToMultipleEmail;
