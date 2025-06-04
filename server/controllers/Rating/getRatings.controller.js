import Teacher from "../../models/teacher.model.js";

// GET /api/teachers/rating/:teacherId
export const getRatings = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);

    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    res.status(200).json({
      rating: teacher.rating,
      ratingCount: teacher.ratingCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rating" });
  }
};
