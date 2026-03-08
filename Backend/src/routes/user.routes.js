import { Router } from 'express'
import { refreshAccessToken, loginUser, logoutUser, registerUser, currentUser, updateProfile } from '../controllers/user.controllers.js';
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
router.route("/profile").patch(upload.single("avatar"), updateProfile);


export default router;