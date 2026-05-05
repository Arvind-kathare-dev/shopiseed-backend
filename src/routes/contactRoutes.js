const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createContact)
  .get(protect, getContacts);

module.exports = router;
