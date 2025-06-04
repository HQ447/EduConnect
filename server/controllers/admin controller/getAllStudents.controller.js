import Student from "../../models/student.model.js";

export async function getAllStudents(req, res) {
  try {
    const students = await Student.find();
    if (!students) return res.json({ message: "error in finding students" });

    return res.json({
      message: "All students data fetch successfully ",
      students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
