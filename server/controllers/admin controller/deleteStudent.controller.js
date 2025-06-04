import Student from "../../models/student.model.js";

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("delete req call", id);

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    await Student.findByIdAndDelete(id);

    res.json({ message: "student removed from the List", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
