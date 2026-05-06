const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add a full name"],
      trim: true,
    },
    shopUrl: {
      type: String,
      required: [true, "Please add a shop URL"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["E-commerce", "Fashion", "Electronics", "Food & Drink", "Health & Beauty", "Other"],
    },
    plan: {
      type: String,
      required: [true, "Please select a plan"],
      enum: ["Free", "Basic", "Pro", "Enterprise"],
      default: "Free",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

module.exports = mongoose.model("User", userSchema);
