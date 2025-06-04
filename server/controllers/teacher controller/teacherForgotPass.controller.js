import Teacher from "../../models/teacher.model.js";
import { sendEmail } from "../../utils/sendEmail.js"; // ✅ using your existing utility

export const teacherForgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(404).json({ message: "teacher not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    teacher.otp = otp;
    teacher.otpExpire = Date.now() + 1 * 60 * 1000; // 1 min
    await teacher.save();

    const message = `
      <h2>Teacher Password Reset Request</h2>
      <p>Please copy the below OTP to reset your password:</p>
      <h1 >${otp}</h1>
      <p>This OTP will expire after 60 seconds.</p>
    `;

    await sendEmail(email, "Password Reset OTP", message);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error sending password reset email",
      error: err.message,
    });
  }
};
