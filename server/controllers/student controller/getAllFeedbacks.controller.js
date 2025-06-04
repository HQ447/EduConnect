import Feedback from "../../models/Feedback.model.js";

export const getAllFeedbacks = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const feedbacks = await Feedback.find({
      teacherId,
    });

    if (!feedbacks) {
      return res.status(404).json({ message: "Feedbacks Not found" });
    }

    res.json({
      message: "Feedback fetch Successfully",
      feedbacks,
    });
  } catch (error) {
    console.error("Error in fetching feedbacks", error);
    res.status(500).json({ message: "Server error" });
  }
};
