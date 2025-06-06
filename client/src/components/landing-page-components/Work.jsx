import { useState, useEffect } from "react";
import { MapPin, BookOpen, Clock, Star } from "lucide-react";

const domain = "http://localhost:8000";

const Work = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate token (since localStorage isn't available in artifacts)
  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    if (!token) return;

    const fetchRecommendations = async () => {
      if (!token) {
        setError("Please log in to view recommendations");
        setLoading(false);
        return;
      }

      try {
        console.log("token student:", token);
        const response = await fetch(`${domain}/tutor/getRecommendations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setRecommendations(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Recommendations Error:", err);
        setError(
          "Failed to load recommendations. Please check if the API server is running."
        );
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Loading recommended teachers...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Recommendations
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 id="Top" className="text-4xl font-bold text-gray-900 mb-4">
            Recommended Teachers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect teachers tailored to your learning needs and
            preferences
          </p>
        </div>

        {/* No recommendations message */}
        {recommendations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Recommendations Available
            </h3>
            <p className="text-gray-600 mb-8">
              We're working on finding the perfect teachers for you. Check back
              soon!
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Browse All Teachers
            </button>
          </div>
        ) : (
          <>
            {/* Teachers Grid */}
            <div className="flex gap-8 mb-12">
              {recommendations.map((teacher) => (
                <div
                  key={teacher._id}
                  className="bg-white p-7 w-[20rem] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  {/* Teacher Image */}
                  <div className="relative h-30 w-30 mx-auto rounded-full  overflow-hidden">
                    {teacher.img ? (
                      <img
                        src={
                          teacher.img
                            ? `${domain}/${teacher.img}`
                            : "../profile.png"
                        }
                        alt={teacher.teacherName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 px-2 bg-white/90 backdrop-blur-sm rounded-full  flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        4.8
                      </span>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="">
                    <h3 className="text-xl mt-2 font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {teacher.teacherName || "Teacher Name"}
                    </h3>

                    <div className="space-y-3 ">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <BookOpen className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium">
                          {teacher.subject || "Subject"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">
                          Experience {teacher.experience || "Experience"} Years
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">
                          {teacher.location || "Location"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-3">
                      <button className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors font-medium text-sm">
                        View Profile
                      </button>
                      <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-sm">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Work;
