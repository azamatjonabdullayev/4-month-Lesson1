import "dotenv/config.js";
import express from "express";
import prisma from "./config/db.connect.js";
import { allRoutes } from "./routes/all.routes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", allRoutes());
app.use("", (_, res) => {
  res.status(404).json({ message: "NOT FOUND" });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

const initServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Server is running");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

initServer();
