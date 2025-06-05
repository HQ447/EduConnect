/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Custom Star Rating Component
const StarRating = ({ rating, onRatingChange, size = 24, editable = true }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starIndex) => {
    if (editable && onRatingChange) {
      onRatingChange(starIndex);
    }
  };

  const handleMouseEnter = (starIndex) => {
    if (editable) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <button
          key={starIndex}
          type="button"
          className={`transition-colors duration-200 ${
            editable ? "cursor-pointer hover:scale-110" : "cursor-default"
          }`}
          onClick={() => handleClick(starIndex)}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onMouseLeave={handleMouseLeave}
          disabled={!editable}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={starIndex <= (hoverRating || rating) ? "#ffd700" : "#e4e5e9"}
            stroke={
              starIndex <= (hoverRating || rating) ? "#ffd700" : "#e4e5e9"
            }
            strokeWidth="1"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

function TeacherDetail() {
  const [teacher, setTeacher] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const { id } = useParams();
  const domain = "http://localhost:8000";
  const token = localStorage.getItem("studentToken");
  const studentId = localStorage.getItem("studentId");

  const fetchTeacher = async () => {
    try {
      const res = await fetch(`${domain}/tutor/getTeacher/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setTeacher(result.teacher);
        setCurrentRating(result.teacher.rating || 0);
      } else {
        console.error("Failed to fetch teacher:", result.message);
      }
    } catch (error) {
      console.error("Error in Fetching teacher", error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${domain}/tutor/getFeedback/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        console.log("feed back::", res);
        setFeedbacks(result.feedbacks || []);
      } else {
        console.error("Failed to fetch feedbacks:", result.message);
      }
    } catch (error) {
      console.error("Error in Fetching feedbacks", error);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!newFeedback.trim()) {
      alert("Please enter a feedback message");
      return;
    }

    try {
      const res = await axios.post(
        `${domain}/tutor/sendFeedback`,
        { studentId: studentId, teacherId: id, feedback: newFeedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("feedback response:", res);
      setNewFeedback("");
      fetchFeedbacks(); // Refresh feedbacks after adding new one
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  const handleRatingChange = async (newRating) => {
    try {
      const res = await axios.post(
        `${domain}/tutor/rateTeacher/${id}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("rating response :", res);

      // Update the local state with new rating

      alert("Thank you for your rating!");
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }

    console.log("student Id", studentId);
    //send rating for Recommendations
    try {
      await axios.post(
        `${domain}/tutor/rateToRecommend`,
        { studentId, teacherId: id, rating: newRating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Failed to rate teacher", error);
    }
  };

  useEffect(() => {
    fetchTeacher();
    fetchFeedbacks();
  }, [id]);

  if (!teacher)
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading teacher details...
      </div>
    );

  return (
    <div className="w-[78%] max-h-screen overflow-y-auto bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={teacher?.img ? `${domain}/${teacher.img}` : "/profile.png"}
              alt={teacher.teacherName}
              className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow-md"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">
              {teacher.teacherName}
            </h1>
            <p className="text-gray-600 mb-4">Qualified & Experienced Tutor</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Detail label="Qualification" value={teacher.degree} />
              <Detail label="Contact" value={teacher.contact} />
              <Detail
                label="Experience"
                value={`${teacher.experience} years`}
              />
              <Detail label="Address" value={teacher.location} />
              <Detail
                label="Subject Expertise"
                value={teacher.subject || "N/A"}
              />
              <div className="border-t pt-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <StarRating
                      rating={currentRating}
                      size={20}
                      editable={false}
                    />
                    <span className="text-sm text-gray-600">
                      {currentRating > 0
                        ? `${currentRating}/5 stars`
                        : "Click to rate"}
                    </span>
                  </div>
                </div>
              </div>
              <Detail label="Email" value={teacher.email || "Not Provided"} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 mt-3 bg-white rounded-2xl shadow-lg">
        <div className="">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Rate this teacher:
            </h3>
            <div className="flex items-center gap-4">
              <StarRating
                onRatingChange={handleRatingChange}
                size={20}
                editable={true}
              />
            </div>
            {currentRating > 0 && (
              <p className="text-sm text-green-600">
                Thank you for rating this teacher!
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex mt-3 w-full gap-3">
            <input
              className="bg-gray-100 py-2 rounded-full px-3 w-[80%]"
              type="text"
              placeholder="Enter Your Feedback"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleFeedbackSubmit()}
            />
            <button
              className="w-[20%] py-2 px-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
              onClick={handleFeedbackSubmit}
            >
              Send
            </button>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Comments ({feedbacks.length})
            </h4>
            {feedbacks.length > 0 ? (
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {feedbacks.map((feedback, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-blue-50 shadow p-4 rounded-lg border-l-4 border-blue-500"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {feedback?.studentImg && (
                            <img
                              src={`${domain}/${feedback.studentImg}`}
                              alt={feedback.studentName}
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 shadow-sm"
                            />
                          )}
                          <span className="font-medium text-gray-800">
                            {feedback.studentName}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-xs">
                        {feedback.feedback || feedback.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No feedbacks yet. Be the first to leave feedback!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable field renderer
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-900">{value}</p>
  </div>
);

export default TeacherDetail;
