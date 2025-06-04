import Notification from "../../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const { receiverId, receiverType } = req.params;

    const notifications = await Notification.find({
      receiverId,
      receiverType,
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};
