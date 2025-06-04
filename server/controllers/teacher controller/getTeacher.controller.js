import Teacher from "../../models/teacher.model.js";

export const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.json({ message: "teacher fetched successfully", teacher });
  } catch (error) {
    console.error("Error in fetching user", error);
    res.status(500).json({ message: "Server error" });
  }
};
