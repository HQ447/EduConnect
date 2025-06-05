import Rating from "../../models/Rating.js";
export const rateTeacher = async (req, res) => {
  const { teacherId, rating, studentId } = req.body;

  try {
    const newRating = new Rating({
      studentId,
      teacherId,
      rating,
    });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: "Failed to rate teacher" });
  }
};
