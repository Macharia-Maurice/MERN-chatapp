const { Server } = require('socket.io');
const UserProfile = require('./models/userProfileModel');

const socketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('profileOnline', async (profileId) => {
            console.log(`Profile online: ${profileId}`);
            socket.profileId = profileId;
            await UserProfile.findByIdAndUpdate(
                profileId,
                { online: true }
            );
            io.emit('statusChange', profileId, true);
        });

        socket.on('profileLogout', async (profileId) => {
            console.log(`Profile logout: ${profileId}`);
            if (profileId) {
                const lastSeen = new Date();
                await UserProfile.findByIdAndUpdate(
                    profileId,
                    { online: false, lastSeen }
                );
                console.log(`Profile offline: ${profileId}, Last seen: ${lastSeen}`);
                io.emit('statusChange', profileId, false, lastSeen);
            }
        });

        socket.on('checkStatus', async (profileId) => {
            console.log(`Checking status for profile: ${profileId}`);
            const userProfile = await UserProfile.findById(profileId);
            if (userProfile) {
                console.log(`Profile status: ${userProfile.online}, Last seen: ${userProfile.lastSeen}`);
                socket.emit('statusChange', profileId, userProfile.online, userProfile.lastSeen);
            } else {
                console.log(`User profile not found for profile: ${profileId}`);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`);
            const profileId = socket.profileId;
            if (profileId) {
                const lastSeen = new Date();
                await UserProfile.findByIdAndUpdate(
                    profileId,
                    { online: false, lastSeen }
                );
                console.log(`Profile offline: ${profileId}, Last seen: ${lastSeen}`);
                io.emit('statusChange', profileId, false, lastSeen);
            }
        });
    });

    return io;
};

module.exports = socketIO;
