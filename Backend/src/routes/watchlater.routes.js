import { Router } from 'express'
import { addToWatchlater, getAllWatchlater, getWatchlater, removeFromWatchlater } from '../controllers/watchlater.controllers.js';
import verifyJWT from '../middlewares/auth.middlewares.js';

const router = Router();

router.use(verifyJWT)
router.route("/").post(addToWatchlater);
router.route("/:id").get(getWatchlater);
router.route("/all").get(getAllWatchlater);
router.route("/:id").delete(removeFromWatchlater)

export default router;