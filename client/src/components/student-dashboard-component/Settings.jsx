import React, { useEffect, useState } from "react";

const StudentSettings = () => {
  const [profile, setProfile] = useState({
    studentName: "",
    email: "",
    contact: "",
    address: "",
  });

  const [imgPreview, setImgPreview] = useState(null);
  const [currPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  const domain = "http://localhost:8000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${domain}/tutor/getStudent/${localStorage.getItem("studentId")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          const student = data.student;
          setProfile({
            studentName: student.studentName || "",
            email: student.email || "",
            address: student.address || "",
            contact: student.contact || "",
          });

          if (student.img) {
            setImgPreview(`${domain}/${student.img}`);
          }
        } else {
          setMessage("Failed to fetch student profile");
        }
      } catch (error) {
        console.error("Error loading student profile", error);
        setMessage("Error loading student profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", profile.studentName);
    formData.append("email", profile.email);
    formData.append("contact", profile.contact);
    formData.append("address", profile.address);

    if (currPassword && newPassword) {
      formData.append("currentPassword", currPassword);
      formData.append("newPassword", newPassword);
    }

    if (profileImage) formData.append("img", profileImage);

    try {
      const res = await fetch(`${domain}/tutor/updateStudentProfile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Student Profile updated successfully!");
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="overflow-auto w-[78%] max-h-screen  p-6 bg-white rounded-xl ">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
      {message && <p className="text-center mb-4 text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mx-auto p-6 w-[50%] shadow-lg "
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={imgPreview || "../profile.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow"
            />
            <label
              htmlFor="fileInput"
              className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer"
              title="Upload new profile image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          name="studentName"
          placeholder="Full Name"
          value={profile.studentName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="contact"
          placeholder="Contact"
          value={profile.contact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address/Location"
          value={profile.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className=" flex flex-col gap-4 border p-3 rounded-md ">
          <h1 className="font-bold mx-auto text-lg">Change Password</h1>
          <input
            type="password"
            placeholder="Current Password"
            value={currPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Submit Information
        </button>
      </form>
    </div>
  );
};

export default StudentSettings;
