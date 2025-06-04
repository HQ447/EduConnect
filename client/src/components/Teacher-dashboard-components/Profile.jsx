/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Profile = () => {
  const [profile, setProfile] = useState({
    teacherName: "",
    email: "",
    contact: "",
    degree: "",
    experience: "",
    subject: "",
    location: "",
    isInstantTutor: false,
  });

  const [coordinates, setCoordinates] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  const domain = "http://localhost:8000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${domain}/tutor/getTeacher/${localStorage.getItem("teacherId")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const teacher = data.teacher;
          setProfile({
            teacherName: teacher.teacherName || "",
            email: teacher.email || "",
            location: teacher.location || "",
            subject: teacher.subject || "",
            contact: teacher.contact || "",
            degree: teacher.degree || "",
            experience: teacher.experience || "",
            isInstantTutor: teacher.isInstantTutor || false,
          });
          if (teacher.coordinates?.coordinates?.length === 2) {
            setCoordinates({
              lat: teacher.coordinates.coordinates[1],
              lng: teacher.coordinates.coordinates[0],
            });
          }
          if (teacher.img) {
            setImgPreview(`${domain}/${teacher.img}`);
          }
        } else {
          setMessage("Failed to fetch teacher profile");
        }
      } catch (error) {
        console.error("Error loading teacher profile", error);
        setMessage("Error loading teacher profile");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${domain}/tutor/getAllCategories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error loading categories ", error);
      }
    };

    const getDeviceLocation = () => {
      if (!coordinates) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setIsLocationLoading(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setIsLocationLoading(false);
          }
        );
      } else {
        setIsLocationLoading(false);
      }
    };

    fetchProfile();
    fetchCategories();
    getDeviceLocation();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setCoordinates(e.latlng);
      },
    });
    return coordinates ? <Marker position={coordinates} /> : null;
  };

  const submitForm = async (formData) => {
    try {
      const res = await fetch(`${domain}/tutor/updateTeacherProfile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setMessage(
        data.success
          ? "Profile updated successfully!"
          : data.message || "Failed to update profile"
      );
    } catch (error) {
      console.error("Submission error", error);
      setMessage("Something went wrong during form submission.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates) {
      setMessage("Please select your location on the map.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("teacherName", profile.teacherName);
    formData.append("email", profile.email);
    formData.append("contact", profile.contact);
    formData.append("degree", profile.degree);
    formData.append("subject", profile.subject);
    formData.append("experience", profile.experience);
    formData.append("location", profile.location);
    formData.append("isInstantTutor", profile.isInstantTutor);
    formData.append("latitude", coordinates.lat);
    formData.append("longitude", coordinates.lng);

    if (profileImage) formData.append("img", profileImage);

    await submitForm(formData);
    setIsLoading(false);
  };

  return (
    <div className="w-[78%] max-h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Profile Management
              </h1>
              <p className="text-slate-600">
                Update your profile information and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <h2 className="text-xl font-bold text-white">
              Update Your Profile
            </h2>
            <p className="text-blue-100 mt-1">
              Keep your information current to attract more students
            </p>
          </div>

          <div className="p-8">
            {/* Message Display */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl border ${
                  message.includes("successfully") ||
                  message.includes("updated")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.includes("successfully") ||
                  message.includes("updated") ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={imgPreview || "../profile.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="fileInput"
                    className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg cursor-pointer transition-colors duration-200"
                    title="Upload new profile image"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Personal Information Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    placeholder="Enter your full name"
                    value={profile.teacherName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={profile.contact}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of teaching experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Degree/Qualification
                  </label>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Your highest qualification"
                    value={profile.degree}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                      name="subject"
                      value={profile.subject || ""}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select your subject
                      </option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Full Address
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your complete address"
                  value={profile.location}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Map Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <label className="block text-sm font-semibold text-slate-700">
                    Pin Your Exact Location
                  </label>
                </div>
                <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                  📍 Click on the map to set your precise location. This helps
                  students find you easily.
                </p>

                <div className="rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg">
                  {isLocationLoading ? (
                    <div className="h-80 bg-slate-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-slate-600">Loading map...</p>
                      </div>
                    </div>
                  ) : !coordinates ? (
                    <div className="h-80 bg-slate-100 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 text-slate-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <p className="text-slate-600">
                          Unable to load location
                        </p>
                      </div>
                    </div>
                  ) : (
                    <MapContainer
                      center={coordinates}
                      zoom={12}
                      style={{ height: "320px", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                      />
                      <LocationPicker />
                    </MapContainer>
                  )}
                </div>
              </div>

              {/* Instant Tutor Toggle */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Instant Tutoring
                      </h3>
                      <p className="text-sm text-slate-600">
                        Enable immediate tutoring requests
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isInstantTutor"
                      checked={profile.isInstantTutor}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          isInstantTutor: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-600/25 flex items-center justify-center gap-2 ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Update Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
