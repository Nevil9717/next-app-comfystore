import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nevilsuvagiya9717@gmail.com",
    pass: "pzfb qpgh eutn eaud",
  },
});

export function sendWelcomeEmail(email, otpCode) {
  if (!email) {
    throw new Error("Recipient's email address is not defined.");
  }
  const mailOptions = {
    from: "nevilsuvagiya9717@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Your OTP code is: ${otpCode}`,
  };
  return transporter.sendMail(mailOptions);
}
