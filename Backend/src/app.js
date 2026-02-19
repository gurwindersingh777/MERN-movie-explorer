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
import watchlaterRouter from './routes/watchlater.routes.js'
import favoriteRouter from './routes/favorite.routes.js'
import ratingRouter from './routes/rating.routes.js'
import reviewRouter from './routes/review.routes.js'
import searchhistoryRouter from './routes/searchhistory.routes.js'

app.use("/api/v1/users", userRouter)  // https://localhost:4000/api/v1/users
app.use("/api/v1/media", mediaRouter)
app.use("/api/v1/watchlater", watchlaterRouter)
app.use("/api/v1/favorite", favoriteRouter)
app.use("/api/v1/rating", ratingRouter)
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/searchhistory", searchhistoryRouter)

export default app;