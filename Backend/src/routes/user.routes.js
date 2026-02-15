import { Router } from 'express'
import { currentUser, loginUser, logoutUser, registerUser } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middlewares.js';
import verfilyJWT from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").get(verfilyJWT, logoutUser);
router.route("/user").get(verfilyJWT, currentUser);


export default router;