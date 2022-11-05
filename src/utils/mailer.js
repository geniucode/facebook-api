import nodemailer from "nodemailer";
import dotenv from "dotenv";

const mailVarification = async ({
  from, // sender address
  to, // list of receivers
  subject, // Subject line
  text, // plain text body
  html, // html body
}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    secure: process.env.mailSecurity, // true for 465, false for other ports

    auth: {
      user: process.env.mailUser, // generated ethereal user
      pass: process.env.mailPassword, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });

  transporter.verify().then(console.log).catch(console.error);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export { mailVarification };
