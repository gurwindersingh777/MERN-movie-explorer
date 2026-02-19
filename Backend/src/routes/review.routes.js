import { Router } from "express"
import verifyJWT from "../middlewares/auth.middlewares.js";
import { addReview, deleteReview, getAllReview, getMyReview, getReview, updateReview } from "../controllers/review.controllers.js";

const router = Router();

router.use(verifyJWT)
router.route("/all/:media_type/:tmdbID").get(getAllReview)
router.route("/").post(addReview)
router.route("/:id").patch(updateReview)
router.route("/:id").delete(deleteReview)
router.route("/:media_type/:tmdbID").get(getReview)
router.route("/my").get(getMyReview)


export default router;