import React, { useEffect, useState } from "react";
import {
  Send,
  Bell,
  Users,
  GraduationCap,
  User,
  MessageSquare,
  Type,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const domain = "http://localhost:8000";

function AdminNotification() {
  const [receiverType, setReceiverType] = useState("Student");
  const [receiverId, setReceiverId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const adminId = localStorage.getItem("adminId");
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          fetch(`${domain}/tutor/getAllStudents`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
          fetch(`${domain}/tutor/getAllTeachers`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
        ]);

        const studentsData = await studentsRes.json();
        const teachersData = await teachersRes.json();

        setStudents(studentsData.students || []);
        setTeachers(teachersData.teachers || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [adminToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiverId || !title || !message) {
      return setStatus("All fields are required.");
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${domain}/tutor/sendNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          senderId: adminId,
          senderType: "Admin",
          receiverId,
          receiverType,
          title,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTitle("");
        setMessage("");
        setReceiverId("");
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const receivers = receiverType === "Student" ? students : teachers;

  return (
    <div className="w-[78%] max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className=" mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Bell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Send Notification
          </h1>
          <p className="text-gray-600 text-lg">
            Communicate with students and teachers instantly
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Status Messages */}
        {status && (
          <div className="max-w-2xl mx-auto mb-8">
            {status === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-green-800 font-medium">
                  Notification sent successfully!
                </span>
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-red-800 font-medium">
                  Failed to send notification. Please try again.
                </span>
              </div>
            )}
            {status !== "success" && status !== "error" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
                <span className="text-yellow-800 font-medium">{status}</span>
              </div>
            )}
          </div>
        )}

        {/* Main Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4">
              <div className="flex items-center text-white">
                <MessageSquare className="w-6 h-6 mr-3" />
                <h2 className="text-xl font-bold">Compose Notification</h2>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Receiver Type Selection */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  Send To
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setReceiverType("Student");
                      setReceiverId("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                      receiverType === "Student"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReceiverType("Teacher");
                      setReceiverId("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                      receiverType === "Teacher"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Teacher
                  </button>
                </div>
              </div>

              {/* Receiver Selection */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Select Recipient
                </label>
                <div className="relative">
                  <select
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 appearance-none bg-white"
                  >
                    <option value="">Choose a recipient...</option>
                    {receivers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.teacherName || user.studentName || "Unnamed User"}{" "}
                        ({user.email})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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
              </div>

              {/* Title Input */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4 mr-2 text-blue-600" />
                  Notification Title
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, descriptive title"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                  Message Content
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your detailed message here..."
                  rows={6}
                />
                <div className="text-right text-sm text-gray-500">
                  {message.length} characters
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading || !receiverId || !title || !message}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Notification
                  </>
                )}
              </button>

              {/* Quick Stats */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {students.length}
                    </div>
                    <div className="text-sm text-blue-800">Students</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {teachers.length}
                    </div>
                    <div className="text-sm text-purple-800">Teachers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotification;
