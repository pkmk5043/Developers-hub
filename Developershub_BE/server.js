const express = require("express");
const app = express();
const mongoose = require("mongoose");
const devuser = require("./devuserModel");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const reviewmodel = require("./reviewmodel");
const cors = require("cors");

// Middleware
app.use(cors({ origin: "http://localhost:3a001", credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/developershub")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error", err));

app.post("/register", async (req, res) => {
  try {
    const { fullname, email, mobile, skill, password, confirmPassword } =
      req.body;

    if (
      !fullname ||
      !email ||
      !mobile ||
      !skill ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send("All fields are required");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await devuser.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new devuser({
      fullname,
      email,
      mobile,
      skill,
      password,
      confirmPassword,
    });

    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await devuser.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, "jwtpassword", { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Token generation failed" });
      }

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          // add any other fields needed on frontend
        },
      });
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/allprofiles", async (req, res) => {
  try {
    const users = await devuser.find();
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Unable to Fetch Users");
  }
});

// Protected Route
app.get("/myprofile", middleware, async (req, res) => {
  try {
    const user = await devuser.findById(req.user.id);
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Unable to Fetch User");
  }
});

app.post("/addreview", middleware, async (req, res) => {
  try {
    const { taskworker, rating } = req.body;
    const user = await devuser.findById(req.user.id);
    const review = new reviewmodel({
      taskprovider: user.fullname,
      taskworker,
      rating,
    });
    review.save();
    return res.status(200).send("Review added successfully");
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

app.get("/myreviews", middleware, async (req, res) => {
  try {
    const reviews = await reviewmodel.find({ taskworker: req.user.id });
    return res.json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Unable to Fetch Reviews");
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const user = await devuser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
