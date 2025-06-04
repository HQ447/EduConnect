import React, { useEffect, useState } from "react";

function Feedback() {
  const domain = "http://localhost:8000";
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("teacherToken");
  const id = localStorage.getItem("teacherId");

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

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-16 w-[78%] max-h-screen overflow-y-auto">
      <div className="">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">
          Student Feedbacks ({feedbacks.length})
        </h4>
        {feedbacks.length > 0 ? (
          <div className="space-y-4 ">
            {feedbacks.map((feedback, index) => {
              return (
                <div key={index} className="bg-blue-50 p-4 rounded-lg shadow">
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
                  <p className="text-gray-700 text-sm">
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
  );
}

export default Feedback;
