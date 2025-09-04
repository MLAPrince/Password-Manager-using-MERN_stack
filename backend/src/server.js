import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import credentialRoutes from "./routes/credentialRoutes.js";
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Parse incoming JSON
app.use(express.json());
app.use(rateLimiter);

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Routes
app.use("/api/credentials", credentialRoutes);

// Connect to DB and then start server
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  })
).catch((err) => console.error("❌ Failed to start server:", err));
