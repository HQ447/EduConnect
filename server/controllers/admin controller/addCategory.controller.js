import Category from "../../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ message: "Category name required" });

    const exists = await Category.findOne({ name, description });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: "Category added", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
