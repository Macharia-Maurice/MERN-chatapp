// socket.js
const { Server } = require("socket.io");

const socketIO = (server) => {
	const io = new Server(server, {
		cors: {
			origin: process.env.FRONTEND_URL || "http://localhost:3000", // Adjust as needed
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.id}`);

		// Listen for new messages
		socket.on("newMessage", (message) => {
			console.log("New message received:", message);

			// Emit the new message to all connected clients
			io.emit("message", message);
		});

		// Handle disconnection
		socket.on("disconnect", () => {
			console.log(`User disconnected: ${socket.id}`);
		});
	});

	return io;
};

module.exports = socketIO;
