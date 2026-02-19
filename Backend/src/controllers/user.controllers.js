import { UserModel } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from 'jsonwebtoken'

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
      throw new ApiError(400, "Username already exists")
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
        new ApiResponse(201, { user: { loggedInUser, accessToken, refreshToken } }, "User registed successfully ")
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
    await user.save({ validateBeforeSave: false })

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
            refreshToken
          }
        },
          "user login successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function logoutUser(req, res) {

  try {
    await UserModel.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          refreshToken: null
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
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function currentUser(req, res) {

  try {
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
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function changeCurrentPassword(req, res) {

  try {
    const { oldPassword, newPassword, confirmPassword } = req.body

    if (!newPassword || !confirmPassword || !oldPassword) {
      throw new ApiError(400, "All field are required")
    }
    if (oldPassword === newPassword) {
      throw new ApiError(400, "New password should be diffrent from old passowrd")
    }
    if (newPassword.length < 5) {
      throw new ApiError(400, "New password must be more than 5 character")
    }
    if (newPassword !== confirmPassword) {
      throw new ApiError(400, "Password does not match")
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      throw new ApiError(400, "User does not exists")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Wrong password");
    }

    user.password = newPassword
    await user.save({
    }, { validateBeforeSave: false })

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Password Changed successfully")
      )
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }

}

async function updateAvatar(req, res) {
  try {
    const avatarLocalPath = req.file.path

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar localpath is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Failed to upload avatar")
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      throw new ApiError(400, "User not found")
    };

    user.avatar = avatar.url;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, {
          avatar: avatar.url
        }, "Avatar updated successfully")
      )
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function updateAccount(req, res) {

  try {
    const { username, fullname } = req.body

    if (!fullname && !username) throw new ApiError(400, "At least one field is requied")
    if (username && username.length < 6) throw new ApiError(400, "Username must be more than 6 character");

    const user = await UserModel.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(400, "User does not found")
    }

    if (username) user.username = username;
    if (fullname) user.fullname = fullname;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "Account details updated successfully")
      )
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}

async function refreshAccessToken(req, res) {

  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      throw new ApiError(400, "Unauthorized request")
    }

    const decordedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await UserModel.findById(decordedToken._id);

    if (!user) {
      throw new ApiError(401, "invalid refresh token")
    }
    console.log(refreshToken);
    console.log(user.refreshToken);

    if (refreshToken !== user.refreshToken) {
      throw new ApiError(401, "invalid refresh token")
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false })

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(200, {
          newAccessToken,
          newRefreshToken
        }, "New access and refresh token generated successfully")
      )
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  changeCurrentPassword,
  updateAvatar,
  updateAccount,
  refreshAccessToken
}