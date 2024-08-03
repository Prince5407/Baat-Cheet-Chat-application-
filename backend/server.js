import path from "path"; 
import express from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import getUser from "./routes/user.routes.js"

import { connecttomongo } from './DB/connectTomongoDb.js';
import cookieParser from 'cookie-parser';
import {app, server} from "./socket/socket.js"


const __dirname=path.resolve();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
import jwt from 'jsonwebtoken';



app.use(cookieParser());

// Routes
// app.get("/", (req, res) => {
//     res.send("Hello world");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",getUser);

app.use(express.static(path.join(__dirname ,"/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Connect to MongoDB
connecttomongo();

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
