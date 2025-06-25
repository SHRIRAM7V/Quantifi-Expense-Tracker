import express from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record-route.js";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Resolve path to .env
// const envPath = path.resolve(__dirname, "../.env");
const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:5173" }));
const port = process.env.PORT || 3001;

app.use(express.json());
const mongoURI = process.env.MONGODB_URL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB"));

app.use("/financial-records", financialRecordRouter);
app.listen(port, () => console.log(`Server Running on Port ${port}`));
