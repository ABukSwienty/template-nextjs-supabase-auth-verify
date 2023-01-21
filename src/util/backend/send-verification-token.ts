import nodemailer from "nodemailer";

/**
 * Sends a verification token to the user's email as a link
 * @param email string
 * @param token string
 * @returns Promise<boolean>
 */
const sendVerificationToken = async (
  email: string,
  token: string
): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const publicUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000/";

  const verifyUrl = `${publicUrl}sign-up/${token}`;
  try {
    const mailData = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Verification token for we-share`,
      text: "Please verify your email by going to the follow url: " + verifyUrl,
    };

    await transporter.sendMail(mailData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendVerificationToken;
