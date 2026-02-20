import { Router } from 'express'
import { changeCurrentPassword, currentUser, refreshAccessToken, loginUser, logoutUser, registerUser, updateAccount, updateAvatar } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middlewares.js';
import verifyJWT from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken)

// secured routes
router.use(verifyJWT)
router.route("/logout").get(logoutUser);
router.route("/user").get(currentUser);
router.route("/change/password").patch(changeCurrentPassword)
router.route("/change/avatar").patch(upload.single("avatar"), updateAvatar);
router.route("/update/account").patch(updateAccount)


export default router;