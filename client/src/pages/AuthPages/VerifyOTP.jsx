import { useState } from "react";
import {
  GraduationCap,
  Shield,
  BookOpen,
  Users,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [role, setRole] = useState("student");
  const domain = "http://localhost:8000/tutor";
  const [otp, setOTP] = useState("");

  // Mock navigate function for demo purposes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role == "teacher") {
        localStorage.setItem("teacherOTP", otp);

        const response = await fetch(`${domain}/teacherOtpVerification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/resetPassword");
          alert(data.message);
        }
      } else if (role == "admin") {
        localStorage.setItem("adminOTP", otp);
        const response = await fetch(`${domain}/adminOtpVerification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          navigate("/resetPassword");
        } else {
          console.error("otp verification failed", data.message);
          alert(data.message);
        }
      } else {
        localStorage.setItem("studentOTP", otp);
        const response = await fetch(`${domain}/studentOtpVerificaion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/resetPassword");
          alert(data.message);
        } else {
          console.error("otp verification failed", data.message);
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error in verifying OTP:", error);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setOTP(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduConnect
          </h1>
          <p className="text-gray-600 mt-2">Verify your identity</p>
        </div>

        {/* OTP Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <KeyRound className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Account type:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                  role === "student"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-medium">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                  role === "teacher"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-xs font-medium">Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                  role === "admin"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="text-xs font-medium">Admin</span>
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* OTP Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-center text-lg font-mono tracking-widest"
                onChange={handleOtpChange}
                value={otp}
                maxLength={6}
                autoComplete="one-time-code"
                required
              />
            </div>

            {/* OTP Length Indicator */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    otp.length >= index
                      ? "bg-green-500 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={otp.length !== 6}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                otp.length === 6
                  ? "hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-500/25"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {otp.length === 6
                ? "Verify Code"
                : `Enter ${6 - otp.length} more digits`}
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-center">
              <p className="text-green-800 text-sm">
                <strong>Check your email!</strong>
                <br />
                The verification code was sent to your registered email address.
                It may take a few minutes to arrive.
              </p>
            </div>
          </div>

          {/* Resend Option */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                onClick={() => {
                  // Add resend logic here if needed
                  console.log("Resend OTP requested");
                }}
              >
                Resend OTP
              </button>
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center border-t border-gray-200 pt-4">
            <a
              href="/login"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Secure verification to protect your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
