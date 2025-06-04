import Teacher from "../../models/teacher.model.js";

// POST /api/teachers/rate/:teacherId
export const teacherRating = async (req, res) => {
  const { rating } = req.body;
  const teacherId = req.params.teacherId;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating (1-5 required)" });
  }

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    const newRatingCount = teacher.ratingCount + 1;
    const newAverage =
      (teacher.rating * teacher.ratingCount + rating) / newRatingCount;

    teacher.rating = newAverage;
    teacher.ratingCount = newRatingCount;

    await teacher.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      rating: teacher.rating,
      ratingCount: teacher.ratingCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
