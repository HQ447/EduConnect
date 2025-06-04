import Admin from "../../models/admin.model.js";

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.json({ message: "Admin fetched successfully", admin });
  } catch (error) {
    console.error("Error in fetching admin", error);
    res.status(500).json({ message: "Server error" });
  }
};
