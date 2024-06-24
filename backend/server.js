import express from 'express';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import getUser from "./routes/user.routes.js"

import { connecttomongo } from './DB/connectTomongoDb.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",getUser);

// Connect to MongoDB
connecttomongo();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
