import { Router } from "express"
import verifyJWT from "../middlewares/auth.middlewares.js";
import { addReview, deleteReview, getMediaAllReview, getMyAllReview, getMediaMyReview, updateReview } from "../controllers/review.controllers.js";

const router = Router();

router.use(verifyJWT)

router.route("/").post(addReview)
router.route("/:id").patch(updateReview)
router.route("/:id").delete(deleteReview)
router.route("/:media_type/:tmdbID").get(getMediaMyReview)
router.route("/my").get(getMyAllReview)
router.route("/all/:media_type/:tmdbID").get(getMediaAllReview)


export default router;