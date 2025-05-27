const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret_key", {
    expiresIn: "7d",
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: messages.join(". "),
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user and get token
// @access  Public
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// @route   POST /api/auth/signout
// @desc    Sign out user (client-side token removal)
// @access  Private
router.post("/signout", auth, (req, res) => {
  // Since we're using stateless JWT, signout is handled on client-side
  // by removing the token from storage
  res.json({
    message: "Signed out successfully",
  });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (email) updateFields.email = email.trim().toLowerCase();

    // Check if email already exists (if being updated)
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email: updateFields.email });
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email already exists",
        });
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: messages.join(". "),
      });
    }

    res.status(500).json({
      message: "Server error during profile update",
    });
  }
});

module.exports = router;
