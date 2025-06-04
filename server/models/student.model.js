import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    contact: { type: String },
    address: { type: String },
    img: { type: String }, // Profile image URL
    otp: { type: String },
    otpExpire: { type: Date },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

export default mongoose.model("Student", studentSchema);
