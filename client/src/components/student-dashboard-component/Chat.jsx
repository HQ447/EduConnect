import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { RxCross2 } from "react-icons/rx";

const socket = io("http://localhost:8000");

function Chat() {
  const [profile, setProfile] = useState({});
  const { tutorId } = useParams();
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();
  const roomId = [studentId, tutorId].sort().join("_");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/tutor/getTeacher/${tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setProfile(data.teacher);
      } else {
        console.log("error in fetching teacher profile");
      }
    } catch (error) {
      console.error("Error loading teacher profile", error);
    }
  };

  useEffect(() => {
    if (studentId && tutorId) {
      socket.emit("join_room", roomId);

      fetch(`http://localhost:8000/messages/${roomId}`)
        .then((res) => res.json())
        .then((oldMessages) => {
          setMessages(oldMessages);
        })
        .catch(console.error);

      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      socket.off("receive_message");
    };
  }, [roomId, studentId, tutorId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      senderId: studentId,
      receiverId: tutorId,
      text: message,
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("send_message", msgData);
    setMessage("");
  };

  useEffect(() => {
    fetchProfile();
  }, [tutorId]);

  return (
    <div
      className="w-full bg-green-50 rounded-md shadow-md h-[100vh] flex flex-col"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Header inside chat box */}
      <div className="flex justify-between items-center p-4 bg-white ">
        <div className="flex gap-3 items-center">
          <img
            src={
              profile.img
                ? `http://localhost:8000/${profile.img}`
                : "/profile.png"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-4 border-blue-100 shadow-lg"
          />
          <div className="flex flex-col">
            <h1 className="font-bold">{profile.teacherName}</h1>
            <h1 className="text-[10px] text-[#0000008a]">{profile._id}</h1>
          </div>
        </div>
        <RxCross2
          onClick={() => navigate("/student-dashboard/studentChatSystem")}
          className="text-2xl hover:scale-95 transition-all cursor-pointer"
        />
      </div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.senderId === studentId ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                msg.senderId === studentId
                  ? "bg-green-200 text-right"
                  : "bg-gray-200"
              }`}
            >
              <strong>{msg.senderId === studentId ? "You" : "Tutor"}:</strong>{" "}
              {msg.text}
              <p className="text-xs text-[#00000093]">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </span>
          </div>
        ))}
      </div>

      {/* Input section fixed inside chat container */}
      <div className="p-4  bg-white flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
