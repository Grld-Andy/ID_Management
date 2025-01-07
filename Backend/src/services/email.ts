import nodemailer from "nodemailer";

interface optionsInterface {
  from: string;
  email: Array<string>;
  subject: string;
  message: string;
}

const sendEmail = async (option: optionsInterface) => {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: "interior-decor<interior-decor@gmail.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOptions);
};

export default sendEmail;
