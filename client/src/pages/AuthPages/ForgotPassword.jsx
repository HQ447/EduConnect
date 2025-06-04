import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Send,
  BookOpen,
  Users,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");

  // Mock navigate function for demo purposes
  const navigate = useNavigate();

  const domain = "http://localhost:8000/tutor";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "") {
      return alert("enter email");
    }
    try {
      if (role == "teacher") {
        console.log("role:", role);
        const response = await fetch(`${domain}/teacherForgotPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          navigate("/verifyotp");
        }
      } else if (role == "admin") {
        console.log("role:", role);
        const response = await fetch(`${domain}/adminForgotPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          navigate("/verifyotp");
        } else {
          console.error("sending otp failed", data.message);
          alert(data.message);
        }
      } else {
        const response = await fetch(`${domain}/studentFogotPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/verifyotp");
          alert(data.message);
        } else {
          console.error("sending OTP failed", data.message);
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error in sending otp:", error);
    }
  };

  // const getRoleColor = () => {
  //   switch (role) {
  //     case "student":
  //       return "blue";
  //     case "teacher":
  //       return "purple";
  //     case "admin":
  //       return "emerald";
  //     default:
  //       return "blue";
  //   }
  // };

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
          <p className="text-gray-600 mt-2">Reset your password</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Forgot Password?
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              No worries! Enter your email and we'll send you a reset code.
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
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Reset Code</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <p className="text-orange-800 text-sm text-center">
              <strong>What happens next?</strong>
              <br />
              We'll send a verification code to your email. Use it to reset your
              password securely.
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
            Secure password recovery for your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
