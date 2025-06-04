import Category from "../../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ message: "All Categories fetch successfully", categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
