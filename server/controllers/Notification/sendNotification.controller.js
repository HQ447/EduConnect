import Notification from "../../models/notification.model.js";

// Send notification (Admin or Teacher)
export const sendNotification = async (req, res) => {
  try {
    const { senderId, senderType, receiverId, receiverType, title, message } =
      req.body;

    // Permission check: Teachers can only send to students
    if (senderType === "Teacher" && receiverType !== "Student") {
      return res
        .status(403)
        .json({ error: "Teachers can only send to students." });
    }

    const notification = new Notification({
      senderId,
      senderType,
      receiverId,
      receiverType,
      title,
      message,
    });

    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification." });
  }
};

// Get notifications for a specific user (Student or Teacher)
