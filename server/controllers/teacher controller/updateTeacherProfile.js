import bcrypt from "bcryptjs";
import Teacher from "../../models/teacher.model.js";
import path from "path";
import fs from "fs";

export const updateTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { latitude, longitude } = req.body;
    const {
      teacherName,
      email,
      subject,
      experience,
      contact,
      location,
      degree,
      isInstantTutor,
    } = req.body;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    //store teacher lat lon coordinates
    if (latitude && longitude) {
      teacher.coordinates = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      };
    }

    // Handle profile image upload
    if (req.file) {
      // Delete old profile image if it exists
      if (teacher.img) {
        const oldImagePath = path.join(process.cwd(), teacher.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set new image path
      teacher.img = `uploads/teachers/${req.file.filename}`;
    }

    // const reverseGeocode = async (lat, lng) => {
    //   try {
    //     const response = await fetch(
    //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
    //     );
    //     const data = await response.json();
    //     return data.display_name || "";
    //   } catch (error) {
    //     console.error("Reverse geocoding failed:", error);
    //     return "";
    //   }
    // };

    // Update basic info
    if (teacherName) teacher.teacherName = teacherName;
    if (email && email !== teacher.email) {
      // Check if email already exists
      const existingTeacher = await Teacher.findOne({
        email,
        _id: { $ne: teacherId },
      });
      if (existingTeacher) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      teacher.email = email;
    }
    // if (latitude && longitude) {
    //   const resolvedLocation = await reverseGeocode(latitude, longitude);
    //   teacher.location = resolvedLocation;
    // }

    if (degree) teacher.degree = degree;
    if (experience) teacher.experience = experience;
    if (subject) teacher.subject = subject;
    if (contact) teacher.contact = contact;
    if (isInstantTutor) teacher.isInstantTutor = isInstantTutor;
    if (location) teacher.location = location;

    teacher.register = true;

    await teacher.save();

    // Return updated user data (without sensitive info)
    res.status(200).json({
      success: true,
      message: "Teacher Profile updated successfully",
      teacher,
    });
  } catch (error) {
    console.error("Update Teacher profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
