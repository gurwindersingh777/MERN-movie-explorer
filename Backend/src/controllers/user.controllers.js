import { UserModel } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

async function registerUser(req, res) {

  try {
    const { fullname, username, email, password } = req.body;

    if (fullname && fullname.length < 5) {
      throw new ApiError(400, "Fullname must be more than 5 characters")
    }
    if (!username || (username.trim() === "")) {
      throw new ApiError(400, "Username is required")
    }
    if (username.length < 5) {
      throw new ApiError(400, "Username must be more than 5 characters")
    }
    if (!email || (email.trim() === "")) {
      throw new ApiError(400, "email is required")
    }
    if (!email.includes("@")) {
      throw new ApiError(400, "invalid email")
    }
    if (!password || (password.trim() === "")) {
      throw new ApiError(400, "password is required")
    }
    if (password.length < 5) {
      throw new ApiError(400, "Password must be more than 6 characters")
    }
    const existedUser = await UserModel.findOne({ email })
    if (existedUser) {
      throw new ApiError(400, "User already exists")
    }
    const usernameAlreadyExists = await UserModel.findOne({ username })
    if (usernameAlreadyExists) {
      throw new ApiError(200, "Username already exists")
    }

    const avatarLocalPath = req.file?.path;
    let avatar;
    if (avatarLocalPath) {
      avatar = await uploadOnCloudinary(avatarLocalPath);
    }


    let createdUser = await UserModel.create({
      fullname: fullname || "",
      username: username,
      email: email,
      password: password,
      avatar: avatar?.url || "",
    })

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while creating the user")
    }

    const accessToken = createdUser.generateAccessToken();
    const refreshToken = createdUser.generateRefreshToken();

    createdUser.refreshToken = refreshToken;
    await createdUser.save({ validateBeforeSave: false });

    const loggedInUser = await UserModel.findById(createdUser._id).select("-password -refreshToken");

    const cookieOptions = {
      httpOnly: true,
      secure: true
    }

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(201, { user: { loggedInUser, accessToken } }, "User registed successfully ")
      )


  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message })
  }

};

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
      throw new ApiError(400, "enter a valid emial");
    }

    if (!password.trim()) {
      throw new ApiError(400, "Password is required");
    }

    let user = await UserModel.findOne({ email })

    if (!user) {
      throw new ApiError(404, "User does not exists");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(404, "Wrong password")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    const loggedInUser = await UserModel.findById(user._id).select("-password -refreshToken");

    if (!loggedInUser) {
      throw new ApiError(400, "Failed to login user")
    }

    const cookieOptions = {
      httpOnly: true,
      secure: true
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, {
          user: {
            loggedInUser,
            accessToken,
          }
        },
          "user login successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function logoutUser(req, res) {

  await UserModel.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: 1
      }
    },
    { new: true })

  const cookieOptions = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(200, {}, "User logout successfully")
    )
}

async function currentUser(req, res) {

  const accessToken = req.cookies?.accessToken;
  const user = await UserModel.findById(req.user?._id).select("-password -refreshToken")

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        user,
        accessToken
      }, "User details fetched successfully")
    )
}

export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser
}