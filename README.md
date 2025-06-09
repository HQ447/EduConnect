## EduConnect - MERN Stack Platform for Students & Teachers

EduConnect is a full-stack web application that bridges the gap between students and local educators. It allows teachers to register and share their expertise, while students can discover and connect with nearby teachers based on location. Built with the MERN stack, EduConnect also features real-time chat, geolocation-based filtering, and an admin panel for user management.

## 🔧 Technical Overview

EduConnect is a feature-rich MERN (MongoDB, Express.js, React.js, Node.js) stack application that connects students with local teachers for tutoring and mentoring.

### 🚀 Main Features

- 👨‍🏫 **Teacher Registration System**

  - Teachers can register by submitting their details: name, qualification, profile image, teaching experience, contact info, and address with geolocation.
  - Images are uploaded and stored securely Cloudinary.

- 📍 **Geolocation-Based Teacher Discovery**

  - Students can view a map of nearby registered teachers using coordinates.
  - Teachers are displayed with pins on an interactive map (e.g., Leaflet, Google Maps).

- 🗺️ **Interactive Map Integration**

  - Map view for students to explore available teachers based on distance and location.
  - Real-time location filtering supported.

- 💬 **Real-Time Chat (Student ↔ Teacher)**

  - One-on-one messaging using **Socket.IO**.
  - Enables direct communication after discovery.

- 🛡️ **Admin Dashboard**

  - View and manage all teacher profiles.
  - Filter teachers by registration status (approved/not approved).
  - Delete teacher accounts if needed.

- 🔐 **Authentication & Authorization**

  - Secure login/signup system for teachers, students, and admin.
  - JWT-based session management.

- 📦 **Backend Architecture**

  - Modular controller-based structure.
  - RESTful API design using Express.js.
  - MongoDB for storing user and teacher data.

- ☁️ **Cloud File Upload**
  - Profile images are uploaded via Multer to **Cloudinary** or another configured service.
  - Metadata stored in MongoDB.

---

### 🧱 Tech Stack

- **Frontend:** React.js, Axios, Socket.IO-client, Leaflet/Mapbox/Google Maps
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT
- **Real-Time:** Socket.IO
- **File Uploads:** Multer + Cloudinary
- **Map & Location:** Geolocation API, Leaflet/Google Maps API

---

### User Interface (Frontend Demo)

![Screenshot (565)](https://github.com/user-attachments/assets/5022000e-383b-488c-b4d6-be17c488ab3e)

![Screenshot (566)](https://github.com/user-attachments/assets/bc45c2d1-bb78-4b1a-a004-2ba2e5f25b9a)
![Screenshot (567)](https://github.com/user-attachments/assets/93579026-a6a9-4618-b5e7-5ba4acb27876)
![Screenshot (568)](https://github.com/user-attachments/assets/a551579e-39b5-4915-a378-3563c4b7245f)
![Screenshot (569)](https://github.com/user-attachments/assets/832d2f3a-e1c9-48f8-a8c9-88e48a14c300)
![Screenshot (573)](https://github.com/user-attachments/assets/dbee96e3-1d13-4144-a34e-55cec2b0bce9)
![Screenshot (575)](https://github.com/user-attachments/assets/f60154fe-83f8-40c4-bfde-b0e7a3372fca)
![Screenshot (572)](https://github.com/user-attachments/assets/ea07acb6-f195-4bc6-abc8-0c5a5000615c)
![Screenshot (571)](https://github.com/user-attachments/assets/6ac7e36b-9217-4d52-b2c4-dbe56eb948c9)
