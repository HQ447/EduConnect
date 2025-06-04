import Teacher from "../../models/teacher.model.js";

export async function getRegisteredTeachers(req, res) {
  try {
    const registeredTeachers = await Teacher.find({ register: true });
    if (!registeredTeachers)
      return res.json({ message: "error in finding Regsitered Teachers" });

    return res.json({
      message: "All registered teachers data fetch successfully ",
      registeredTeachers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
