const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, 
  port: 465,
  secure: true, 
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false, 
  },    
  logger: true, 
  debug: true, 
});


async function sendMail(user,next) {
    try {
        const info = await transporter.sendMail({
          from: `${process.env.MAIL_USER}`,
          to: user.email,
          subject: user.subject,
          text: user.text,
        });
    
        console.log("Message sent: %s", info.messageId);
      } catch (error) {
      console.error("Error sending email:", error);
       if (next) next(error);
      }
}

module.exports = sendMail;