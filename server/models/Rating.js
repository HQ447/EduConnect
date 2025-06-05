import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.model("Rating", ratingSchema);
