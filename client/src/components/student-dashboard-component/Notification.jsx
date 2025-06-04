import React, { useEffect, useState } from "react";

const domain = "http://localhost:8000"; // Your backend base URL

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("studentId");
  const studentToken = localStorage.getItem("studentToken");

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `${domain}/tutor/getNotifications/${studentId}/Student`,
        {
          headers: {
            Authorization: `Bearer ${studentToken}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        console.log("notification:", data);
        setNotifications(data.notifications);
      } else {
        console.error("Failed to load notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [studentId, studentToken]);

  const handleDeleteNotification = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/tutor/removeNotification/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${studentToken}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Notification deleted successfully");
        // optionally update UI
        fetchNotifications();
      } else {
        alert("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Server error occurred");
    }
  };

  return (
    <div className="w-[78%] mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📩 Your Notifications
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-600">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">
                  From: <strong>{notif.senderType}</strong>
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
              <h4 className="font-bold text-lg">{notif.title}</h4>
              <p className="text-gray-700">{notif.message}</p>
              <button
                onClick={() => handleDeleteNotification(notif._id)}
                className="px-3 bg-red-600 text-white rounded-md py-1 hover:scale-95 transition-all cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentNotifications;
