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

// Enable CORS only in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173", // your frontend
  }));
}

// Routes
app.use("/api/credentials", credentialRoutes);

// Connect to DB and then start server
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  })
).catch((err) => console.error("❌ Failed to start server:", err));
