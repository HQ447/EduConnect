import Teacher from "../../models/teacher.model.js";
import bcrypt from "bcryptjs";

export const teacherResetPass = async (req, res) => {
  const { otp, password } = req.body;

  try {
    if (!otp || !password) {
      return res.status(400).json({ message: "OTP and password are required" });
    }

    const teacher = await Teacher.findOne({
      otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!teacher) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    teacher.password = hashedPassword;
    teacher.otp = undefined;
    teacher.otpExpire = undefined;
    await teacher.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res
      .status(500)
      .json({ message: "Error in Password Reset", error: err.message });
  }
};
