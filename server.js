import express from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import doctorsRouter from "./routes/doctorsRouter.js";
import authRouter from "./routes/authRouter.js";
import errorHandler from "./middleware/errorRouteHandler.js";
import tokenRouter from "./routes/tokenRouter.js";
import aiRouter from "./routes/openaiRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const url = process.env.MONGO_URI;

app.use(cors({
  // origin: "http://localhost:5173/",
  origin: "https://doctors-frontend-i725.onrender.com",
  credentials: true
}))

app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/doctors", doctorsRouter);
app.use("/refresh-token", tokenRouter)
app.use("/api/v1/ai", aiRouter)
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
