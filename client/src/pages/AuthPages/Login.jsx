import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  BookOpen,
  Users,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("student");

  // Mock navigate function for demo purposes
  const navigate = useNavigate();
  const domain = "http://localhost:8000/tutor";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role == "teacher") {
        console.log("role:", role);
        const response = await fetch(`${domain}/teacherLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          const { token } = data;
          console.log("Tutor Login successful", data);
          const payload = JSON.parse(atob(token.split(".")[1]));
          const teacherId = payload.id;
          const teacherName = payload.name;
          alert(data.message);

          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentId");
          localStorage.removeItem("studentName");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminId");
          localStorage.removeItem("adminName");

          localStorage.setItem("teacherToken", token);
          localStorage.setItem("teacherId", teacherId);
          localStorage.setItem("teacherName", teacherName);
          console.log("Tutor token", localStorage.getItem("teacherToken"));
          console.log("Tutor Id", localStorage.getItem("teacherId"));
          console.log("Tutor Name", localStorage.getItem("teacherName"));

          navigate("/");
        } else {
          alert(data.message);
        }
      } else if (role == "admin") {
        console.log("role:", role);
        const response = await fetch(`${domain}/adminLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          const { token } = data;
          console.log("admin Login successful", data);
          const payload = JSON.parse(atob(token.split(".")[1]));
          const adminId = payload.id;
          const adminName = payload.name;
          alert(data.message);

          localStorage.removeItem("teacherToken");
          localStorage.removeItem("teacherId");
          localStorage.removeItem("teacherName");
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentId");
          localStorage.removeItem("studentName");

          localStorage.setItem("adminToken", token);
          localStorage.setItem("adminId", adminId);
          localStorage.setItem("adminName", adminName);
          console.log("Admin token", localStorage.getItem("adminToken"));
          console.log("Admin Id", localStorage.getItem("adminId"));
          console.log("Admin Name", localStorage.getItem("adminName"));
          navigate("/");
        } else {
          console.error("Login failed", data.message);
          alert(data.message);
        }
      } else {
        console.log("data", formData);
        const response = await fetch(`${domain}/studentLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          const { token } = data;
          console.log("Student Login successful", data);
          const payload = JSON.parse(atob(token.split(".")[1]));
          const studentId = payload.id;
          const studentName = payload.name;
          alert(data.message);
          localStorage.removeItem("teacherToken");
          localStorage.removeItem("teacherId");
          localStorage.removeItem("teacherName");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminId");
          localStorage.removeItem("adminName");

          localStorage.setItem("studentToken", token);
          localStorage.setItem("studentId", studentId);
          localStorage.setItem("studentName", studentName);

          console.log("Student token", localStorage.getItem("studentToken"));
          console.log("Student Id", localStorage.getItem("studentId"));
          console.log("Student Name", localStorage.getItem("studentName"));
          navigate("/");
        } else {
          console.error("Login failed", data.message);
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Error in logging:", error);
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

  // const getRoleIcon = () => {
  //   switch (role) {
  //     case "student":
  //       return BookOpen;
  //     case "teacher":
  //       return Users;
  //     case "admin":
  //       return Shield;
  //     default:
  //       return BookOpen;
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
          <p className="text-gray-600 mt-2">Welcome back to learning</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign In
          </h2>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Sign in as:
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
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                role === "student"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25"
                  : role === "teacher"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/25"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/25"
              }`}
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 space-y-4">
            {/* Forgot Password */}
            <div className="text-center">
              <a
                href="/forgotPassword"
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>

            {/* Register Link */}
            <div className="text-center border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Secure login to your learning dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
