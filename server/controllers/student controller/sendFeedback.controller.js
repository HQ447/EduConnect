import Feedback from "../../models/Feedback.model.js";
import Student from "../../models/student.model.js";

export const sendFeedback = async (req, res) => {
  const { studentId, teacherId, feedback } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentFeedback = new Feedback({
      studentId,
      teacherId,
      studentName: student.studentName,
      studentImg: student.img,
      feedback,
    });

    await studentFeedback.save();

    return res.json({
      message: "Feedback Record Successfully",
      feedback: studentFeedback,
    });
  } catch (error) {
    console.error("Error in saving feedback", error);
    res.status(500).json({ message: "Server error" });
  }
};
