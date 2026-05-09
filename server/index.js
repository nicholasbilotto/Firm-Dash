import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import clientRoutes from "./routes/client.js";
import authRoutes from "./routes/auth.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * CORS Configuration
 * Allows requests from the development frontend and production origin.
 */
const corsOptions = {
	origin: process.env.CLIENT_URL || "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

/* STATIC FILES & ROUTES */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// API Routes
app.use("/client", clientRoutes);
app.use("/auth", authRoutes);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "build")));

// Fallback for SPA routing
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build/index.html"));
});

/* DATABASE SETUP */
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
	})
	.catch((error) => {
		console.error("Database connection error:", error);
	});
