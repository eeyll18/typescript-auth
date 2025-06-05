import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoute";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();

// DB 
connectDB();

// Middlewares
app.use(helmet()); 
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", protectedRoutes); 

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("API is running...");
});

app.use(errorHandler);

export default app;
