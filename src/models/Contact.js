const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    workEmail: {
      type: String,
      required: [true, 'Work email is required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
    },
    storeName: {
      type: String,
      required: [true, 'Store name is required'],
    },
    storeUrl: {
      type: String,
      required: [true, 'Store URL is required'],
    },
    whatDoYouSell: {
      type: String,
    },
    achieve: {
      type: String,
      required: [true, 'Primary goal is required'],
    },
    launchSoon: {
      type: String,
      required: [true, 'Timeline is required'],
    },
    features: {
      type: String,
    },
    monthlyRevenue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
