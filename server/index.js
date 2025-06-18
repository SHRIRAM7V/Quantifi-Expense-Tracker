// MongoPass:gYLOZfDirU7tqNGw
import express from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record-route.js";

import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
const port = process.env.PORT || 3001;

app.use(express.json());
const mongoURI =
  "mongodb+srv://shriramvenkatesh76:gYLOZfDirU7tqNGw@xtraccluster.n51orae.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB"));

  
app.use("/financial-records", financialRecordRouter);
app.listen(port, () => console.log(`Server Running on Port ${port}`));
