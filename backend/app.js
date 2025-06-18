import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import passport from "passport";

import connectDB from "./config/db.js";
import "./utils/passport.js";

import authRoutes from "./routes/authRoutes.js";
import chefRoutes from "./routes/chefRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();
connectDB();

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(morgan("dev"));
app.use(cors({ 
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chef", chefRoutes);
app.use("/api/delivery", deliveryRoutes);

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

export default app;
