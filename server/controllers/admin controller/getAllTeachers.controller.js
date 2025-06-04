import Teacher from "../../models/teacher.model.js";

export async function getAllTeachers(req, res) {
  try {
    const teachers = await Teacher.find();
    if (!teachers) return res.json({ message: "error in finding teachers" });

    return res.json({
      message: "All Teachers data fetch successfully ",
      teachers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
