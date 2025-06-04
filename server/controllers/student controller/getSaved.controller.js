import Save from "../../models/save.model.js";

export async function getSaved(req, res) {
  try {
    const savedTeachers = await Save.find();
    if (!savedTeachers)
      return res.json({ message: "error in finding saved teachers" });

    return res.json({
      message: "All saved Teachers data fetch successfully ",
      savedTeachers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
