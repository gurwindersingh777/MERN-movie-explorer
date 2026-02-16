import { Router } from 'express'
import { changeCurrentPassword, currentUser, refreshAccessToken, loginUser, logoutUser, registerUser, updateAccount, updateAvatar } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middlewares.js';
import verfilyJWT from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken)

// secured routes
router.route("/logout").get(verfilyJWT, logoutUser);
router.route("/user").get(verfilyJWT, currentUser);
router.route("/change/password").patch(verfilyJWT, changeCurrentPassword)
router.route("/change/avatar").patch(upload.single("avatar"), verfilyJWT, updateAvatar);
router.route("/update/account").patch(verfilyJWT,updateAccount)


export default router;