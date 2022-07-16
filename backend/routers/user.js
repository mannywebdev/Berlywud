const express = require("express");
const User = require("../models/user");
const Otp = require("../models/otps");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");
const { sendResetPasswordEmail } = require("../utils.js");
const generateToken = require("../utils.js").generateToken;
const restAuth = require("../utils").restAuth;
const isAdmin = require("../utils").isAdmin;
let api_key = process.env.MAILGUN_API_KEY;
let domain = process.env.MAILGUN_DOMAIN;
const userRouter = express.Router();
const formData = require("form-data");
const sgMail = require("@sendgrid/mail");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const client = mailgun.client({ username: "api", key: api_key });

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({})
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid Email or Password" });
  })
);

userRouter.post(
  "/send-resetpassword-mail",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      sgMail.setApiKey(process.env.SEND_GRID_KEY);
      var digits = "0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += digits[Math.floor(Math.random() * 10)];
      }
      const msg = {
        to: user.email, // Change to your recipient
        from: process.env.SEND_GRID_VERIFIED_SENDER, // Change to your verified sender
        subject: `Reset Password Code ${code}`,
        text: `Reset Password Code ${code}`,
        html: sendResetPasswordEmail(code),
      };
      await sgMail.send(msg);
      await Otp.create({
        email: user.email,
        otp: code,
        expireIn: new Date().getTime() + 300 * 1000,
      });
      res.status(200).send({ message: "Email Sent" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.post(
  "/reset-password",
  expressAsyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;

    const entries = await Otp.find({ email: email }).sort({ _id: -1 }).limit(1);
    if (entries[0].otp !== otp) {
      res.status(404).send({ message: "Invalid Code" });
    } else {
      await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: bcrypt.hashSync(password, 8),
          },
        }
      );
      res.status(200).send({ message: "Password changes successfully" });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  restAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/:id",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

module.exports = userRouter;
