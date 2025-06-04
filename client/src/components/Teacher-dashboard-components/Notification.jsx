import React, { useEffect, useState } from "react";

const domain = "http://localhost:8000"; // Replace with your actual backend URL

function Notification() {
  const [students, setStudents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const teacherId = localStorage.getItem("teacherId");
  const teacherToken = localStorage.getItem("teacherToken");

  // Fetch students list to select for sending notification
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${domain}/tutor/getAllStudents`, {
          headers: {
            Authorization: `Bearer ${teacherToken}`,
          },
        });
        const data = await res.json();
        if (data.ok || data.students) {
          setStudents(data.students || []);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [teacherToken]);

  // Fetch received notifications (from Admin)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${domain}/tutor/getNotifications/${teacherId}/Teacher`,
          {
            headers: {
              Authorization: `Bearer ${teacherToken}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [teacherId, teacherToken]);

  // Send notification to student
  const handleSend = async () => {
    if (!receiverId || !title || !message) {
      alert("Fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${domain}/tutor/sendNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({
          senderId: teacherId,
          senderType: "Teacher",
          receiverId,
          receiverType: "Student",
          title,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Notification sent successfully!");
        setTitle("");
        setMessage("");
        setReceiverId("");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete notification

  return (
    <div className="w-[78%] overflow-y-auto max-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className=" ">
        {/* Header */}
        <div className="mb-8 flex ">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
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
                  d="M15 17h5l-5 5V9a7 7 0 10-14 0v8"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Notifications
              </h1>
              <p className="text-slate-600">
                Manage your notifications and stay connected
              </p>
            </div>
          </div>
        </div>

        <div className=" w-2xl mx-auto">
          {/* Send Notification Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Send Notification
                  </h2>
                  <p className="text-green-100 text-sm">Notify your students</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Select Student
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                  >
                    <option value="">Choose a student...</option>
                    {students.map((student) => (
                      <option
                        key={student._id}
                        value={student._id}
                        className="flex justify-center"
                      >
                        {student.studentName}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
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
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Notification Title
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter notification title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Write your message here..."
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Send Button */}
              <button
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-600/25 flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={handleSend}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Notification
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
