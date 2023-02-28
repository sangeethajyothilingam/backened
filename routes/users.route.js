import express from "express";
import bcrypt from "bcrypt";
import {
  createaccount,
  getUserByemail,
  updateUser,
  getUserByUserId,
  updatePassword,
} from "../services/users.service.js";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import rn from "random-number";
import { Authenticate } from "../Middleware/Authenticate.js";

//const clienturl = "https://resilient-alfajores-4a4f33.netlify.app";

const options = {
  min: 1000,
  max: 9999,
  integer: true,
};
const router = express.Router();

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashedPassword);
  return hashedPassword;
}

// CreateAccount
router.post("/createaccount", async function (req, res) {
  try {
    req.body.password1 = await generateHashedPassword(req.body.password1);
    delete req.body.password2;
    const userFromDB = await createaccount(req.body);
    if (userFromDB) {
      res.json({ message: "User  registered successfully" });
    } else {
      res.json({ message: " something went wrong.Contact Administrator" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login
router.post("/login", async function (req, res) {
  try {
    const { email } = req.body;
    const user = await getUserByemail(email);

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password1);
      if (match) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          message: "Successfully Logged in",
          token: token,
          email: user.email,
        });
      } else {
        res.json({ message: "Email/Password Incorrect" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// verification mail
router.post("/verifyMail", async function (req, res) {
  try {
    const { email } = req.body;
    const user = await getUserByemail(email);

    if (user) {
      let randomnum = rn(options);
      console.log("body", req.body.email);
      await updateUser(email, randomnum);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: Process.env.PASSWORD,
        },
      });

      var mailOptions = {
        from: "sangeetha7e@gmail.com",
        to: `${req.body.email}`,
        subject: "User verification",
        text: `${randomnum}`,
        //html: `<h2>Password : ${req.body.Password}</h2>`
      };

      await transporter.verifyMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json({
            message: "Error",
          });
        } else {
          console.log("Email sent: " + info.response);
          res.json({
            message: "Email sent",
          });
        }
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// User Details
router.get("/userDetails", Authenticate, async function (req, res) {
  try {
    const { userid } = req.body;
    const userDet = await getUserByUserId(userid);
    if (userDet) {
      res.status(200).json({ userDet });
    }
  } catch (error) {
    console.log(error);
  }
});
// verification

router.post("/verification", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByemail(email);

    if (user.rnum === req.body.vercode) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Invalid Verification Code" });
    }
  } catch (error) {
    console.log(error);
  }
});

// update password
router.post("/updatepassword/:id", async function (req, res) {
  try {
    console.log(req.params.id);

    req.body.password1 = await generateHashedPassword(req.body.password1);
    req.body.password1 = hash;
    delete req.body.password2;

    const { email } = req.body;
    req.body.password1;
    const updatePassword = await updatePassword({ email });
    if (updatePassword) {
      res.json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});
export default router;
