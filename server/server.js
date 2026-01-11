import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
