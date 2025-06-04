import Admin from "../../models/admin.model.js";
export const adminVerifyOTP = async (req, res) => {
  const { otp } = req.body;
  const admin = await Admin.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  });
  if (!admin)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified" });
};
