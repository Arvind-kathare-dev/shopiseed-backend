const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      default: "admin",
    },
    otp: String,
    otpExpire: Date,
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Encrypt password using bcrypt
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate OTP
adminSchema.methods.generateOTP = function () {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to database
  this.otp = otp;
  // Set expire (15 mins)
  this.otpExpire = Date.now() + 15 * 60 * 1000;
  this.otpVerified = false;

  return otp;
};

// Verify OTP
adminSchema.methods.verifyOTP = function (enteredOTP) {
  return this.otp === enteredOTP && Date.now() <= this.otpExpire;
};

module.exports = mongoose.model("Admin", adminSchema);
