import Save from "../../models/save.model.js";

export const removeSaveTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const saveTeacher = await Save.findById(id);

    if (!saveTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await Save.findByIdAndDelete(id);

    res.json({ message: "Teacher Removed From Save", saveTeacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
