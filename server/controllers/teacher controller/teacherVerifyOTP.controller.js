import Teacher from "../../models/teacher.model.js";
export const teacherVerifyOTP = async (req, res) => {
  const { otp } = req.body;
  const teacher = await Teacher.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  });
  if (!teacher)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified" });
};
