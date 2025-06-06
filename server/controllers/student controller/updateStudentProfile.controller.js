import bcrypt from "bcryptjs";
import Student from "../../models/student.model.js";
import path from "path";
import fs from "fs";

export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { studentName, email, contact, address, currPassword, newPassword } =
      req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Handle profile image upload
    if (req.file) {
      student.img = req.file.path;
    }

    // Update basic info
    if (studentName) student.studentName = studentName;
    if (email && email !== student.email) {
      // Check if email already exists
      const existingStudent = await Student.findOne({
        email,
        _id: { $ne: studentId },
      });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      student.email = email;
    }
    if (address) student.address = address;

    if (contact) student.contact = contact;

    if (currPassword && newPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(
        currPassword,
        student.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      student.password = hashedNewPassword;
    }

    await student.save();

    // Return updated user data (without sensitive info)
    res.status(200).json({
      success: true,
      message: "Student Profile updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update Student profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
