import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  studentName: { type: String, required: true },
  studentImg: { type: String, require: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedBackSchema);
