import Teacher from "../../models/teacher.model.js";

export const getNearbyTeachers = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ success: false, message: "Coordinates required" });
  }

  try {
    const teachers = await Teacher.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 15000, // 15 km radius
        },
      },
      register: true,
    });

    res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error("Error finding nearby teachers", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
