import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { NavLink } from "react-router-dom";

const Nearby = () => {
  const domain = "http://localhost:8000";
  const [teachers, setTeachers] = useState([]);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      //console.log("GEO COORDS:", latitude, longitude);
      setUserCoords({ lat: latitude, lng: longitude });

      try {
        const res = await fetch(
          `${domain}/tutor/getNearbyTeachers?latitude=${latitude}&longitude=${longitude}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) setTeachers(data.teachers);
        //console.log("Nearby teachers data:", data);
      } catch (err) {
        console.error("Failed to fetch nearby teachers:", err);
      }
    });
  }, []);

  return (
    <div className="w-[78%] p-2 ">
      {userCoords && (
        <MapContainer
          center={[userCoords.lat, userCoords.lng]}
          zoom={13}
          className="h-full w-full "
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User's own location */}
          <Marker position={[userCoords.lat, userCoords.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Teachers */}
          {teachers.map((teacher) => {
            const coords = teacher.coordinates?.coordinates;
            if (!coords || coords.length !== 2) return null;

            return (
              <Marker
                key={teacher._id}
                position={[coords[1], coords[0]]} // [lat, lng]
                icon={L.divIcon({
                  html: `
      <div style="
        width: 40px;
        height: 40px;
      
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #4A90E2;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        background: white;
      ">
        <img
          src="${teacher.img ? teacher.img : "/profile.png"}"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
    `,
                  className: "", // Remove default icon styles
                  iconSize: [40, 40],
                  iconAnchor: [20, 20], // Center the icon on point
                  popupAnchor: [0, -20],
                })}
              >
                <Popup>
                  <div className="text-center ">
                    <strong className="text-[15px] font-bold block">
                      {teacher.teacherName}
                    </strong>
                    {teacher.subject}
                    <br />
                    {teacher.location}
                    <br />
                    <NavLink
                      to={`/student-dashboard/teacher-detail/${teacher._id}`}
                      className="mt-2 inline-block px-4 py-1 bg-blue-500 !text-white rounded hover:bg-blue-600 transition"
                    >
                      Show Details
                    </NavLink>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default Nearby;
