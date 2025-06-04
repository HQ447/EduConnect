import Student from "../../models/student.model.js";
export const studentVerifyOTP = async (req, res) => {
  const { otp } = req.body;
  const student = await Student.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  });
  if (!student)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified" });
};
