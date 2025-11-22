import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import fs from "fs";
import "dotenv/config";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

// Serve /uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment", paymentRoutes);

// ---------------------------
// 🔥 PRODUCTION FRONTEND SERVING FIX
// ---------------------------
const frontendBuildPath = path.join(__dirname, "frontend", "build");

console.log("Checking build folder:", frontendBuildPath);

if (process.env.NODE_ENV === "production") {
  // Serve frontend ONLY IF build folder exists
  if (fs.existsSync(frontendBuildPath)) {
    console.log("Frontend build FOUND. Serving static files...");

    app.use(express.static(frontendBuildPath));

    // All non-API routes → index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendBuildPath, "index.html"));
    });
  } else {
    console.warn(
      "⚠ WARNING: Frontend build NOT found. Skipping static serving."
    );

    // Friendly message instead of crashing
    app.get("/", (req, res) => {
      res.send(
        "API running. No frontend build detected on server. If frontend is on Vercel, this is expected."
      );
    });
  }
} else {
  // Development root
  app.get("/", (req, res) => {
    res.send("API running in development mode...");
  });
}

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
