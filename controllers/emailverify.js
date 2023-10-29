const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailgun = require("mailgun-js");

// Generate a random secret key for JWT signing
const tokenSecretKey = crypto.randomBytes(64).toString("hex");

const mailgunApiKey = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const local_URL = process.env.LOCALHOST_URL;

const mailgunClient = mailgun({
  apiKey: mailgunApiKey,
  domain: mailgunDomain,
});

const sendVerifyEmail = async (name, email, user_id) => {
  try {
    const token = jwt.sign({ user_id }, tokenSecretKey, { expiresIn: "24h" });

    const data = {
      from: "usamabajwa3131@gmail.com", // Sender email address
      to: email,
      subject: "Verify Your Account",
      text: `Hello ${name},\n\nClick the following link to verify your account: http://${local_URL}/api/verify/${token}`,
    };

    mailgunClient.messages().send(data, (error, body) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", body);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendVerifyEmail,
};
