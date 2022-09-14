const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const connectDB = require('./db/connectDB');
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const main = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const server = app.listen(process.env.PORT, () =>
            console.log(`Server is listening on port ${process.env.PORT}...`));

        const io = socket(server, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true,
            },
        });

        global.onlineUsers = new Map();
        io.on("connection", (socket) => {
            global.chatSocket = socket;
            socket.on("add-user", (userId) => {
                onlineUsers.set(userId, socket.id);
            });

            socket.on("send-msg", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-recieve", data.msg);
                }
            });
        });
    } catch (error) {
        console.log(error.message);
    }
}

main();
