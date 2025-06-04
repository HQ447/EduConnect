import Student from "../../models/student.model.js";
import bcrypt from "bcryptjs";

/**
 * Register a new student
 */
export const studentRegistration = async (req, res) => {
  try {
    const { studentName, email, password, confirmPassword } = req.body;

    const checkStudent = await Student.findOne({ email });
    if (checkStudent) {
      return res
        .status(400)
        .json({ message: "Student is already registed , Please login" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match. Try again." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const student = new Student({
      studentName,
      email,
      password: hashedPassword,
    });
    await student.save();

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
