require("dotenv").config();
const User = require("../models/users");
const Business = require("../models/business");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const _ = require("lodash");

const { sendVerifyEmail } = require("./emailverify");

// Generate a random secret key for JWT signing
const tokenSecretKey = crypto.randomBytes(64).toString("hex");

const mailgunApiKey = process.env.MAILGUN_API_KEY;
const mailgunDomain = process.env.MAILGUN_DOMAIN;
const local_URL = process.env.LOCALHOST_URL;

const mailgun = require("mailgun-js")({
  apiKey: mailgunApiKey,
  domain: mailgunDomain,
});

// ...

const verifyUserToken = (token) => {
  try {
    const decoded = jwt.verify(token, tokenSecretKey);
    return { isValid: true, user_id: decoded.user_id };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

exports.verifyUser = async (req, res) => {
  const { token } = req.params;
  const verificationResult = verifyUserToken(token);

  if (verificationResult.isValid) {
    try {
      const user = await User.findById(verificationResult.user_id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update user status as verified
      user.isVerified = true;
      await user.save();

      // Generate a login token and log in the user
      const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey, {
        expiresIn: "1h",
      });

      res.redirect(`http://${local_URL}/api/login?token=${loginToken}`);

      res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: verificationResult.error });
  }
};

// register api
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, business, roles } = req.body;

    const businessObj = await Business.findOne({ name: business });
    if (!businessObj) {
      return res.status(406).json({ error: "Business not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      businesses: [
        {
          business: businessObj._id,
          roles,
        },
      ],
    });
    const savedUser = await newUser.save();

    sendVerifyEmail(savedUser.name, savedUser.email, savedUser._id);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login api

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: "User is not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const loginToken = jwt.sign({ user_id: user._id }, tokenSecretKey);

    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: _.flatten(user.businesses.map((business) => business.roles)),
      token: loginToken,
    };

    res.status(200).json({ message: "Login successful", user: userDetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
