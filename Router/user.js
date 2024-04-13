import express from "express";
import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import {
  decodeJwtToken,
  generateJwtToken,
  getCurrentDate,
} from "../service.js";

let app = express.Router();

//signup
app.post("/signup", async (req, res) => {
  try {
    // Find user already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //generate hash password
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(req.body.password, salt);

    let date = getCurrentDate();

    let count = 1;

    //Add user to DB
    let newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      count: count,
      lastLoginDate: date,
      gender: req.body.gender,
    }).save();

    let token = generateJwtToken(newUser._id);

    res.status(200).json({ message: "Sign Up successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let Userinfo = await User.findOne({ email });
    if (!Userinfo) {
      return res.status(400).json({ message: "User not found" });
    }
    //password cheking
    let validatePassword = await bcrypt.compare(
      password,
      Userinfo.password //comparing user entered pass and already exisit hashed pass
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    let date = getCurrentDate();
    let count = Userinfo.count + 1;
    await User.findOneAndUpdate(
      { email },
      { $set: { lastLoginDate: date, count } }
    );
    let token = generateJwtToken(Userinfo._id);
    console.log(token, Userinfo);

    res.status(200).json({ message: "Logged In Successfull !", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/get", async (req, res) => {
  try {
    let token = req.headers.token;
    console.log("test", token);
    let userId = await decodeJwtToken(token);

    let userinfo = await User.findById({ _id: userId });

    if (userinfo.email !== process.env.adminemail) {
      return res
        .status(200)
        .json({ message: "User Details !", data: userinfo });
    }

    let alluserinfo = await User.find();
    res.status(200).json({ message: "All user Details !", data: alluserinfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export let router = app;
