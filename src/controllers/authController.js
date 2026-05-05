const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Register a new admin
// @route   POST /api/auth/signup
// @access  Public
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    if (admin) {
      res.status(210).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).select("+password");

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot password - Send OTP to email
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "There is no admin with that email" });
    }

    // Generate OTP
    const otp = admin.generateOTP();

    // Save admin with OTP
    await admin.save({ validateBeforeSave: false });

    // Send OTP via email
    const message = `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 15 minutes.\n\nDo not share this OTP with anyone.`;

    try {
      await sendEmail({
        email: admin.email,
        subject: "Password Reset OTP",
        message,
      });

      res.status(200).json({
        success: true,
        message: "OTP sent to email successfully",
        email: admin.email,
      });
    } catch (err) {
      console.log(err);
      admin.otp = undefined;
      admin.otpExpire = undefined;
      admin.otpVerified = false;

      await admin.save({ validateBeforeSave: false });

      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide email and OTP" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if OTP exists and not expired
    if (!admin.otp || Date.now() > admin.otpExpire) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one" });
    }

    // Verify OTP
    if (!admin.verifyOTP(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark OTP as verified
    admin.otpVerified = true;
    await admin.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset password using OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if OTP is verified
    if (!admin.otpVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    // Check if OTP is still valid
    if (Date.now() > admin.otpExpire) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update password
    admin.password = password;
    admin.otp = undefined;
    admin.otpExpire = undefined;
    admin.otpVerified = false;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
const logoutAdmin = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  verifyOTP,
  resetPassword,
  logoutAdmin,
  getMe,
};
