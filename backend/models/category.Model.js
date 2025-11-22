import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if model exists before creating it
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
