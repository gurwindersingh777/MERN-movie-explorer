import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { addRating, getMyRating, getRating, removeRating, updateRating } from "../controllers/rating.controllers.js";

const router = Router();

router.use(verifyJWT)
router.route("/").post(addRating)
router.route("/my").get(getMyRating)
router.route("/:media_type/:tmdbID").get(getRating)
router.route("/:id").patch(updateRating)
router.route("/:id").delete(removeRating)

export default router;