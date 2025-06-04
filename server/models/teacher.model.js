import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    teacherName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    contact: { type: Number },
    degree: { type: String },
    experience: { type: Number },
    subject: { type: String },
    location: { type: String },
    img: { type: String }, // Profile image URL
    register: { type: Boolean, default: false },
    isInstantTutor: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    otp: { type: String },
    otpExpire: { type: Date },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);
teacherSchema.index({ coordinates: "2dsphere" });
export default mongoose.model("Teacher", teacherSchema);
