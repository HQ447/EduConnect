import Admin from "../../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, name: admin.adminName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // optional
      }
    );

    // Return token and optional user info
    res.json({
      message: "Admin Login successful",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
