import Teacher from "../../models/teacher.model.js";

export async function notRegisterTeachers(req, res) {
  try {
    const teachers = await Teacher.find({ register: false });
    if (!teachers)
      return res.json({ message: "error in finding Not Regsitered Teachers" });

    return res.json({
      message: "Not registered teachers data fetch successfully ",
      teachers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
