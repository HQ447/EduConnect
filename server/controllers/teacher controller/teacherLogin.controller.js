import Teacher from "../../models/teacher.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "teacher not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: teacher._id, name: teacher.teacherName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // optional
      }
    );

    // Return token and optional user info
    res.json({
      message: "Teacher Login successful",
      token,
      teacher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
