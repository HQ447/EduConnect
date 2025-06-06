import React, { useEffect, useState } from "react";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    adminName: "",
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
          `${domain}/tutor/getAdmin/${localStorage.getItem("adminId")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          const admin = data.admin;
          setProfile({
            adminName: admin.adminName || "",
            email: admin.email || "",
            address: admin.address || "",
            contact: admin.contact || "",
          });

          if (admin.img) {
            setImgPreview(admin.img);
          }
        } else {
          setMessage("Failed to fetch admin profile");
        }
      } catch (error) {
        console.error("Error loading admin profile", error);
        setMessage("Error loading admin profile");
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
    formData.append("adminName", profile.adminName);
    formData.append("email", profile.email);
    formData.append("contact", profile.contact);
    formData.append("address", profile.address);

    if (currPassword && newPassword) {
      formData.append("currentPassword", currPassword);
      formData.append("newPassword", newPassword);
    }

    if (profileImage) formData.append("img", profileImage);

    try {
      const res = await fetch(`${domain}/tutor/updateAdminProfile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Admin Profile updated successfully!");
      } else {
        setMessage(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="w-[78%] max-h-screen overflow-y-auto">
      <div className=" max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            name="adminName"
            placeholder="Full Name"
            value={profile.adminName}
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

          <div className=" bg-amber-100 rounded-md p-3">
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
    </div>
  );
};

export default AdminSettings;
