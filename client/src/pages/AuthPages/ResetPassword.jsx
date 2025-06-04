import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Commented out for demo
  const domain = "http://localhost:8000/tutor";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert("Password Not Matched");

    try {
      if (role == "teacher") {
        const otp = localStorage.getItem("teacherOTP");

        const response = await fetch(`${domain}/teacherResetPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          localStorage.removeItem("teacherOTP");
          navigate("/login"); // Commented out for demo
        }
      } else if (role == "admin") {
        const otp = localStorage.getItem("adminOTP");
        const response = await fetch(`${domain}/adminResetPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          localStorage.removeItem("adminOTP");
          navigate("/login"); // Commented out for demo
        } else {
          console.error("Password Reset failed", data.message);
          alert(data.message);
        }
      } else {
        const otp = localStorage.getItem("studentOTP");
        const response = await fetch(`${domain}/studentResetPass`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          localStorage.removeItem("studentOTP");
          navigate("/login"); // Commented out for demo
        } else {
          console.error("Password Reset failed", data.message);
          alert(data.message);
        }
      }
    } catch (error) {
      console.log("Error in Reseting password:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10"></div>

      <div className="relative w-full max-w-md">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-20"></div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <p className="text-gray-600 mt-2">
              Create a new secure password for your account
            </p>
          </div>

          <div className="space-y-5">
            <div className="relative group">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Select Role
              </label>
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer hover:border-gray-300"
              >
                <option value="student">👨‍🎓 Student</option>
                <option value="teacher">👨‍🏫 Teacher</option>
                <option value="admin">👨‍💼 Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none mt-8">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative group">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative group">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm placeholder-gray-400"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Reset Password
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-2">Remember your password?</p>
            <a
              href="/login"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-300 group"
            >
              <svg
                className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
