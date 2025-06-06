import React, { useEffect, useState } from "react";
import {
  Trash2,
  Search,
  Users,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Award,
} from "lucide-react";

function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");

  const domain = "http://localhost:8000";
  const token = localStorage.getItem("adminToken");

  const fetchTeachers = async (type) => {
    let endpoint = "/tutor/getAllTeachers";
    if (type === "registered") endpoint = "/tutor/getRegisteredTeachers";
    if (type === "not-registered") endpoint = "/tutor/notRegisterTeachers";

    try {
      setLoading(true);
      const res = await fetch(`${domain}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      let key;
      if (type === "registered") {
        key = "registeredTeachers";
      } else {
        key = "teachers";
      }

      const teachersArray = Array.isArray(data[key]) ? data[key] : [];

      if (res.ok && teachersArray.length > 0) {
        setTeachers(teachersArray);
        setError("");
      } else {
        setTeachers([]);
        setError("No teachers found.");
      }
    } catch (err) {
      console.error("Failed to load teachers:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    try {
      const res = await fetch(`${domain}/tutor/deleteTeacher/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Teacher deleted successfully.");
        fetchTeachers(filterType);
      } else {
        alert("Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchTeachers(filterType);
  }, [filterType]);

  const filteredTeachers = teachers.filter((teacher) => {
    if (!teacher) return false;
    const nameMatch = teacher.teacherName
      ? teacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    const subjectMatch = teacher.subject
      ? teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    return nameMatch || subjectMatch;
  });

  const getFilterStats = () => {
    const all = teachers.length;
    const registered = teachers.filter((t) => t.isRegistered).length;
    const notRegistered = all - registered;
    return { all, registered, notRegistered };
  };

  const stats = getFilterStats();

  return (
    <div className="max-h-screen w-[78%] overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className=" mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Teacher Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and organize your teaching staff
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Teachers", count: stats.all },
                {
                  key: "registered",
                  label: "Registered",
                  count: stats.registered,
                },
                {
                  key: "not-registered",
                  label: "Not Registered",
                  count: stats.notRegistered,
                },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilterType(key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    filterType === key
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md transform scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="block">{label}</span>
                  <span className="text-xs opacity-80">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or subject..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg">Loading teachers...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-red-600 text-lg font-medium">{error}</p>
          </div>
        )}

        {/* No Results State */}
        {!loading &&
          !error &&
          filteredTeachers.length === 0 &&
          teachers.length > 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">
                No teachers found matching your search
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try adjusting your search terms
              </p>
            </div>
          )}

        {/* Teachers Grid */}
        {!loading && filteredTeachers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher._id}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-90 hover:scale-100"
                >
                  <Trash2 size={16} />
                </button>

                {/* Profile Section */}
                <div className="relative z-10 text-center mb-4">
                  <div className="relative inline-block">
                    <img
                      src={teacher.img ? teacher.img : "/default-profile.png"}
                      alt="Profile"
                      className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {teacher.isInstantTutor && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="font-bold text-lg text-gray-900 mt-3 mb-1">
                    {teacher.teacherName || "N/A"}
                  </h2>
                  {teacher.isInstantTutor && (
                    <span className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Instant Tutor
                    </span>
                  )}
                </div>

                {/* Details Section */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{teacher.subject || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                    <span className="truncate">{teacher.contact || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-purple-500 flex-shrink-0" />
                    <span className="truncate">{teacher.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-red-500 flex-shrink-0" />
                    <span className="truncate">
                      {teacher.location || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-3 text-yellow-500 flex-shrink-0" />
                    <span className="truncate">
                      {teacher.experience || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherManagement;
