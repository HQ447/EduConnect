import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function ChatSystem() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch students using fetch API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("teacherToken");
        const response = await fetch(
          "http://localhost:8000/tutor/getAllStudents",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    (student.studentName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-h-screen overflow-y-auto w-[78%] flex h-screen scroll-auto   ">
      {/* Sidebar */}
      <div className=" max-h-screen p-5  w-[50%] flex flex-col overflow-y-auto">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Student"
          className="px-3 bg-gray-100 text-black text-sm rounded-full py-2 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Students List */}
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div
              key={student._id}
              className="flex hover:bg-gray-100 hover:scale-95 transition-all cursor-pointer items-center gap-3 text-black rounded-lg p-2"
              onClick={() => navigate(`tutor-chat/${student._id}`)}
            >
              <img
                src={student.img ? student.img : "profile.png"}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-[10px] text-gray-500">ID: {student._id}</p>
                <p className="font-medium">{student.studentName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatSystem;
