const nodemailer = require("nodemailer");
const config = require("../configs/config");
const logger = require("../utils/logger");

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const sendWelcomeEmail = async (to) => {
  const subject = "Welcome Email";
  const text = `Dear user,
  Welcome to our application, 
  
  Note: If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

module.exports = {
  transport,
  sendWelcomeEmail,
};
