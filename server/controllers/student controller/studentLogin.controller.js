import Student from "../../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, name: student.studentName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // optional
      }
    );

    // Return token and optional user info
    res.json({
      message: "Student Login successful",
      token,
      student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
