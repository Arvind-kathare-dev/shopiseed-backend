const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"],
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "Tag", // Default Lucide icon name
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create slug from name before saving
categorySchema.pre("save", async function () {
  if (this.name) {
    this.slug = this.name.split(" ").join("-").toLowerCase();
  }
});

module.exports = mongoose.model("Category", categorySchema);
