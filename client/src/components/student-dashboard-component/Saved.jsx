/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

function Saved() {
  const token = localStorage.getItem("studentToken");
  const domain = "http://localhost:8000";
  const [savedTeachers, setSavedTeachers] = useState([]);

  const handleDeleteSave = async (id) => {
    try {
      const response = await fetch(`${domain}/tutor/removeSaveTeacher/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchSavedTeachers();
      } else {
        console.error("Failed to delete saved teachers:", result.message);
      }
    } catch (error) {
      console.error("Error deleting saved teachers:", error);
    }
  };

  const fetchSavedTeachers = async () => {
    try {
      const response = await fetch(`${domain}/tutor/getSavedTeachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setSavedTeachers(result.savedTeachers);
      } else {
        console.error("Failed to fetch saved teachers:", result.message);
      }
    } catch (error) {
      console.error("Error fetching saved teachers:", error);
    }
  };

  useEffect(() => {
    fetchSavedTeachers();
  }, []);

  return (
    <div className="p-6 w-[78%] max-h-screen overflow-y-auto mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Saved Teachers
      </h2>

      {savedTeachers.length === 0 ? (
        <div className="text-gray-500 text-center py-10 bg-gray-50 rounded-lg shadow-inner">
          No teachers saved yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white flex flex-col  border border-gray-200 shadow-sm hover:shadow-lg rounded-lg p-5 transition-shadow duration-300"
            >
              <img
                src={teacher.img ? `${domain}/${teacher.img}` : "/profile.png"}
                alt={teacher.teacherName}
                className="rounded-full mx-auto h-30 w-30 object-cover mb-3"
              />
              <h3 className="text-xl font-bold mx-auto text-gray-800 mb-2">
                {teacher.teacherName}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>
                  <strong>Email:</strong> {teacher.email}
                </li>
                <li>
                  <strong>Contact:</strong> {teacher.contact}
                </li>
                <li>
                  <strong>Degree:</strong> {teacher.degree}
                </li>
                <li>
                  <strong>Subject:</strong> {teacher.subject}
                </li>
                <li>
                  <strong>Location:</strong> {teacher.location}
                </li>
                <li>
                  <strong>Experience:</strong> {teacher.experience}
                </li>
                <li>
                  <strong>Rating:</strong> {teacher.rating}
                </li>
                <li>
                  <strong>Instant Tutor:</strong>{" "}
                  {teacher.isInstantTutor ? "Yes" : "No"}
                </li>
              </ul>
              <button
                onClick={() => handleDeleteSave(teacher._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200 w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;
