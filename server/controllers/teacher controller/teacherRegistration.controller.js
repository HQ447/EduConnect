import Teacher from "../../models/teacher.model.js";
import bcrypt from "bcryptjs";

/**
 * Register a new student
 */
export const teacherRegistration = async (req, res) => {
  try {
    const { teacherName, email, password, confirmPassword } = req.body;

    const checkTeacher = await Teacher.findOne({ email });
    if (checkTeacher) {
      return res
        .status(400)
        .json({ message: "Teacher is already registed , Please login" });
    }

    if (password !== confirmPassword) {
      return res.json({ message: "Password not match , Try Again" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const teacher = new Teacher({
      teacherName,
      email,
      password: hashedPassword,
    });
    await teacher.save();

    res
      .status(201)
      .json({ message: "Teacher registered successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
