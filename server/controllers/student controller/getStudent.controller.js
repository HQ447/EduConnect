import Student from "../../models/student.model.js";

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json({ message: "Student fetched successfully", student });
  } catch (error) {
    console.error("Error in fetching student", error);
    res.status(500).json({ message: "Server error" });
  }
};
