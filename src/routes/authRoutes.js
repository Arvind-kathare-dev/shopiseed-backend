const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  verifyOTP,
  resetPassword,
  logoutAdmin,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", protect, logoutAdmin);
router.get("/me", protect, getMe);

module.exports = router;
