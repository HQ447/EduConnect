import Save from "../../models/save.model.js";

export const savedTeacher = async (req, res) => {
  try {
    const {
      studentId,
      teacherId,
      teacherName,
      img,
      email,
      contact,
      degree,
      subject,
      location,
      register,
      rating,
      isInstantTutor,
    } = req.body;
    const existingSaveTeacher = await Save.findOne({ teacherId, studentId });

    if (existingSaveTeacher) {
      return res.status(400).json({ message: "Teacher is already Saved" });
    }

    const data = await Save.create({
      studentId,
      teacherId,
      teacherName,
      img,
      email,
      contact,
      degree,
      subject,
      location,
      register,
      rating,
      isInstantTutor,
    });

    res.status(201).json({ message: "Teacher Saved", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
