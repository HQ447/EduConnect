import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function StudentChatSystem() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch students using fetch API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        const response = await fetch(
          "http://localhost:8000/tutor/getRegisteredTeachers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Teachers");
        }

        const data = await response.json();
        setTeachers(data.registeredTeachers || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  // Filter students based on search term
  const filteredTeachers = teachers.filter((teacher) =>
    (teacher.teacherName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" w-[78%] flex max-h-screen overflow-y-auto  bg-gray-100 ">
      {/* Sidebar */}
      <div className=" w-[50%] bg-white   p-5   flex flex-col overflow-y-auto">
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
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="flex hover:bg-gray-100 hover:scale-95 transition-all cursor-pointer items-center gap-3 text-black rounded-lg p-2"
              onClick={() => navigate(`student-chat/${teacher._id}`)}
            >
              <img
                src={
                  teacher.img
                    ? `http://localhost:8000/${teacher.img}`
                    : "profile.png"
                }
                alt={teacher.teacherName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-[10px] text-gray-500">ID: {teacher._id}</p>
                <p className="font-medium">{teacher.teacherName}</p>
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

export default StudentChatSystem;
