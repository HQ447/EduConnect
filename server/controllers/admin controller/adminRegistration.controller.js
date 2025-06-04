import Admin from "../../models/admin.model.js";
import bcrypt from "bcryptjs";

/**
 * Register a new admin
 */
export const adminRegistration = async (req, res) => {
  try {
    const { adminName, email, password, confirmPassword } = req.body;

    const checkAdmin = await Admin.findOne({ email });
    if (checkAdmin) {
      return res
        .status(400)
        .json({ message: "Admin is already registed , Please login" });
    }

    if (password !== confirmPassword) {
      return res.json({ message: "Password not match , Try Again" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const admin = new Admin({
      adminName,
      email,
      password: hashedPassword,
    });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
