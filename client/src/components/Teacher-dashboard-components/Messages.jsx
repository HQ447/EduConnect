/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { RxCross2 } from "react-icons/rx";

// Connect to your backend Socket.IO server
const socket = io("http://localhost:8000"); // 🔁 Change to your backend URL if deployed

function Messages() {
  const [profile, setProfile] = useState({});
  const { studentId } = useParams();
  const tutorId = localStorage.getItem("teacherId");
  const navigate = useNavigate();
  const roomId = [studentId, tutorId].sort().join("_");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/tutor/getStudent/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        const student = data.student;
        setProfile(student);
      } else {
        console.log("error in fetching student profile");
      }
    } catch (error) {
      console.error("Error loading student profile", error);
    }
  };

  useEffect(() => {
    if (studentId && tutorId) {
      // Join the unique room
      socket.emit("join_room", roomId);

      // Fetch old messages from backend API
      fetch(`http://localhost:8000/messages/${roomId}`)
        .then((res) => res.json())
        .then((oldMessages) => {
          setMessages(oldMessages);
        })
        .catch(console.error);

      // Listen for incoming messages
      socket.on("receive_message", (data) => {
        console.log("Message received from server:", data); // Debugging
        setMessages((prev) => [...prev, data]);
      });
    }

    // Clean up listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [roomId, studentId, tutorId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      senderId: tutorId,
      receiverId: studentId,
      text: message,
    };

    // Optimistic UI: Show sent message immediately
    setMessages((prev) => [...prev, msgData]);

    // Emit message to server
    socket.emit("send_message", msgData);

    setMessage(""); // Clear input
  };

  useEffect(() => {
    fetchProfile();
  }, [studentId]);

  return (
    <div className="w-full bg-green-50 rounded-md shadow-md h-[100vh] flex flex-col  ">
      <div className="flex justify-between items-center p-4 bg-white ">
        <div className="flex  gap-1 items-center">
          <img
            src={
              profile.img
                ? `http://localhost:8000/${profile.img}`
                : "../profile.png"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-4 border-blue-100 shadow-lg"
          />
          <div className="flex flex-col ">
            <h1 className="font-bold">{profile.studentName}</h1>
            <h1 className="text-[10px] text-[#0000008a]">{profile._id}</h1>
          </div>
        </div>
        <RxCross2
          onClick={() => navigate("/teacher-dashboard/chatSystem")}
          className="text-2xl hover:scale-95 transition-all cursor-pointer"
        />
      </div>

      <div className=" flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.senderId === studentId ? "left" : "right",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                backgroundColor:
                  msg.senderId === studentId ? "#eee" : "#DCF8C6",
                borderRadius: "16px",
                maxWidth: "70%",
              }}
            >
              <strong>{msg.senderId === studentId ? "Student" : "You"}:</strong>{" "}
              {msg.text}
              <p className="text-xs text-[#00000093]">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </span>
          </div>
        ))}
      </div>

      <div
        style={{ display: "flex", gap: "10px" }}
        className="p-4  bg-white flex gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Messages;
