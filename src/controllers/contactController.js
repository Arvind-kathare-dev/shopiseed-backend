const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');
const getContactEmailTemplate = require('../utils/contactEmailTemplate');


// @desc    Create new contact submission
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Send email notification
    try {
      const emailHtml = getContactEmailTemplate(contact);

      await sendEmail({
        email: 'admin@veloc.in', // Admin email
        subject: `🚀 New Lead: ${contact.fullName} - ${contact.storeName || 'Store'}`,
        html: emailHtml,
        replyTo: contact.workEmail,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // We don't want to fail the request if email fails, but we should log it
    }

    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
};
