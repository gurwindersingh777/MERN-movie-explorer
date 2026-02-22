import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import { UserModel } from '../models/user.models.js';

async function verifyJWT(req, res, next) {

  try {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decordedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserModel.findById(decordedToken._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token")
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 400).json({ success: false, error: error.message })
  }
}

export default verifyJWT;
