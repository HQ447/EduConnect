import bcrypt from "bcryptjs";
import Admin from "../../models/admin.model.js";
import path from "path";
import fs from "fs";

export const updatedAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { adminName, email, contact, address, currPassword, newPassword } =
      req.body;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Handle profile image upload
    if (req.file) {
      // Delete old profile image if it exists
      if (admin.img) {
        const oldImagePath = path.join(process.cwd(), admin.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Set new image path
      admin.img = `uploads/admins/${req.file.filename}`;
    }

    // Update basic info
    if (adminName) admin.adminName = adminName;
    if (email && email !== admin.email) {
      // Check if email already exists
      const existingAdmin = await Admin.findOne({
        email,
        _id: { $ne: studentId },
      });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      admin.email = email;
    }
    if (address) admin.address = address;

    if (contact) admin.contact = contact;

    if (currPassword && newPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(
        currPassword,
        admin.password
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
      admin.password = hashedNewPassword;
    }

    await admin.save();

    // Return updated user data (without sensitive info)
    res.status(200).json({
      success: true,
      message: "Admin Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Update Admin profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
