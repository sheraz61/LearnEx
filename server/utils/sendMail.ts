import dotenv from 'dotenv';
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: {
    [key: string]: any;
  };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const { email, subject, template, data } = options;

  // Get the path to the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  // Render the email template with ejs
  const htmlContent: string = await ejs.renderFile(templatePath, data);

  // Send via Brevo HTTP API
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      sender: {
        name: "LearnEx",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: email,
        },
      ],
      subject: subject,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Brevo API Error:", errorData);
    throw new Error(`Failed to send email: ${errorData.message || response.statusText}`);
  }
};

export default sendMail;
