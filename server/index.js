// server.js
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import connectDB from "./config/connectDB.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/message.model.js"; // Ensure this exists

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update to your frontend's deployed URL in production
    methods: ["GET", "POST"],
  },
});

// Database connection
const db_url = process.env.DB_URL;
connectDB(db_url);

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/tutor", routes);

// Test route
app.get("/", (req, res) => res.send("Server is running 🚀"));

// ✅ Socket.IO Logic
io.on("connection", (socket) => {
  //console.log("New user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    //console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", async (data) => {
    const { roomId, senderId, receiverId, text } = data;

    try {
      // Save message to DB
      const newMessage = await Message.create({
        roomId,
        senderId,
        receiverId,
        text,
        createdAt: new Date(),
      });

      // Emit to room
      io.to(roomId).emit("receive_message", newMessage);
    } catch (err) {
      console.error("Message save error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

// ✅ REST API to fetch old messages
app.get("/messages/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
