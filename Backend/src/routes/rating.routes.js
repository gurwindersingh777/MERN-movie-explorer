import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { addRating, getMyAllRating, getMediaMyRating, removeRating, updateRating } from "../controllers/rating.controllers.js";

const router = Router();

router.use(verifyJWT)

router.route("/").post(addRating)
router.route("/:id").patch(updateRating)
router.route("/:id").delete(removeRating)
router.route("/my").get(getMyAllRating)
router.route("/:media_type/:tmdbID").get(getMediaMyRating)

export default router;