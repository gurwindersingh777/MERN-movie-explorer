import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import userRouter from './routes/user.routes.js';
import mediaRouter from './routes/media.routes.js'

app.use("/api/v1/users", userRouter)  // https://localhost:4000/api/v1/users
app.use("/api/v1/media", mediaRouter)

export default app;