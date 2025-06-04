import Admin from "../../models/admin.model.js";
import bcrypt from "bcryptjs";

export const adminResetPass = async (req, res) => {
  const { otp, password } = req.body;

  //   console.log("Reset Password Triggered");
  //   console.log("OTP:", otp);
  //   console.log("New Password:", password);

  try {
    if (!otp || !password) {
      return res.status(400).json({ message: "OTP and password are required" });
    }

    const admin = await Admin.findOne({
      otp,
      otpExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    admin.otp = undefined;
    admin.otpExpire = undefined;
    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res
      .status(500)
      .json({ message: "Error in Password Reset", error: err.message });
  }
};
