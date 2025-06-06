import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

//import ReactWhatsapp from "react-whatsapp";

function Category() {
  //console.log("ReactWhatsapp:", ReactWhatsapp);

  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [category, setCategory] = useState("");
  //const [imgPreview, setImgPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedTeachers, setSavedTeachers] = useState(new Set());
  const domain = "http://localhost:8000"; // update if needed

  const token = localStorage.getItem("studentToken");

  // const fetchTeacherRatings = async () => {
  //   try {
  //     const res = await fetch(`${domain}/tutor/ratings/${}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();

  //     const teachersData = data.registeredTeachers;

  //     if (res.ok) {
  //       // Ensure teachersData is an array
  //       console.log("Teacher Rating:", teachersData);

  //       setError("");
  //     } else {
  //       setError("No Rating found.");
  //     }
  //   } catch (error) {
  //     console.error("Error in fetching teachers ratings", error);
  //     setError("Failed to load teachers ratings.");
  //   }
  // };

  const fetchRegisteredTeacher = async () => {
    try {
      const res = await fetch(`${domain}/tutor/getRegisteredTeachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const teachersData = data.registeredTeachers;

      if (res.ok) {
        // Ensure teachersData is an array
        console.log("reg teachers:", teachersData);
        const teachersArray = Array.isArray(teachersData)
          ? teachersData
          : [teachersData];
        setTeachers(teachersArray);

        setError("");
      } else {
        setTeachers([]);
        setError("No registered teachers found.");
      }
    } catch (error) {
      console.error("Error loading registered teachers", error);
      setError("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${domain}/tutor/getAllCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
        setError("");
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error loading categories ", error);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredTeacher();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter teachers based on category and search query
  const filteredTeachers = teachers
    .filter(
      (teacher) =>
        category === "" ||
        (teacher.subject &&
          teacher.subject.toLowerCase() === category.toLowerCase())
    )
    .filter(
      (teacher) =>
        searchQuery === "" ||
        teacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (teacher.subject &&
          teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleSave = async (teacher) => {
    const data = {
      studentId: localStorage.getItem("studentId"),
      teacherId: teacher._id,
      teacherName: teacher.teacherName,
      email: teacher.email,
      contact: teacher.contact,
      degree: teacher.degree,
      experience: teacher.experience,
      subject: teacher.subject,
      location: teacher.location,
      coordinates: teacher.coordinates,
      img: teacher.img,
      register: teacher.register,
      isInstantTutor: teacher.isInstantTutor,
      rating: teacher.rating,
    };

    try {
      const response = await fetch(`${domain}/tutor/saveTeacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setSavedTeachers((prev) => new Set([...prev, teacher._id]));
        alert(result.message);
      }
    } catch (error) {
      console.error("Error in Save Teacher::", error);
    }
  };

  const getStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-[78%] max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-10">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find Your Perfect Tutor
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with qualified teachers across various subjects
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by teacher name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 text-sm py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Category Filters */}
          {categories && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCategory("")}
                className={` rounded-full text-sm py-2 px-4 transition-all duration-200 ${
                  category === ""
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Subjects
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setCategory(cat.name)}
                  className={` rounded-full px-4 text-sm transition-all duration-200 ${
                    category === cat.name
                      ? "bg-blue-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600 text-sm">
              Showing{" "}
              <span className="font-semibold text-blue-600">
                {filteredTeachers.length}
              </span>{" "}
              teachers
              {category && (
                <span>
                  {" "}
                  in <span className="font-semibold">{category}</span>
                </span>
              )}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-700 font-medium text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Teachers Grid */}
        {!loading && filteredTeachers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white cursor-pointer rounded-2xl shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 transform overflow-hidden"
              >
                {/* Card Header */}
                <div className="relative p-6 pb-4">
                  <button
                    onClick={() => handleSave(teacher)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-red-50 transition-all duration-200"
                  >
                    {savedTeachers.has(teacher._id) ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-red-500 text-xl" />
                    )}
                  </button>
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <img
                        src={teacher.img ? teacher.img : "../profile.png"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                      />
                      {teacher.isInstantTutor && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ⚡ Instant
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Teacher Name */}
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {teacher.teacherName}
                  </h3>
                  {/* <p className="text-yellow-600 font-semibold">
                    Avg. Rating: {teacher.rating?.toFixed(1)} ⭐ (
                    {teacher.ratingCount} ratings)
                  </p> */}
                  {/* Rating */}
                  <div className="flex justify-center items-center ">
                    <div className="flex items-center gap-1">
                      {getStarRating(teacher.rating)}
                      <span className="text-gray-600 text-sm ml-2">
                        ({teacher.ratingCount || 0})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-3 space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-800">
                      📚 {teacher.subject || "Subject not specified"}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-500">📧</span>
                      <span className="truncate">{teacher.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-500">📞</span>
                      <span>{teacher.contact}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-500">🎓</span>
                      <span>{teacher.degree} Year Experience</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-500">👔</span>
                      <span>{teacher.experience} Year Experience</span>
                    </p>
                    <p className="flex items-center gap-2 ">
                      <span className="text-blue-500">📍</span>
                      <span className="line-clamp-1">{teacher.location}</span>
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className=" flex pt-1 pb-2 gap-1 text-sm">
                    <button
                      onClick={() =>
                        navigate(
                          `/student-dashboard/studentChatSystem/student-chat/${teacher._id}`
                        )
                      }
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Chat
                    </button>
                    {teacher.isInstantTutor && (
                      <a
                        href={`https://wa.me/${
                          teacher.contact
                        }?text=${encodeURIComponent(
                          `Hello Sir ${teacher.teacherName}!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 px-3">
                          Whatsapp
                        </button>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/student-dashboard/teacher-detail/${teacher._id}`
                      )
                    }
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 px-3"
                  >
                    Visit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && filteredTeachers.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="bg-gray-50 rounded-xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Teachers Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filters to find more
                teachers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
