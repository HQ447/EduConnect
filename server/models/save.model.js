import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  teacherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: Number },
  degree: { type: String },
  experience: { type: Number },
  subject: { type: String },
  location: { type: String },
  img: { type: String }, // Profile image URL
  register: { type: Boolean, default: false },
  isInstantTutor: { type: Boolean, default: false },
  rating: { type: Number, default: 1 },
});

// Ensure a user can only have one of each product
//FavSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Save", saveSchema);
