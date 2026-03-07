import {Router} from 'express'
import verifyJWT from '../middlewares/auth.middlewares.js';
import { addToFavorite, getAllFavorite, getFavorite, removeFromFavorite } from '../controllers/favorite.controllers.js';

const router = Router();

router.use(verifyJWT)
router.route("/").post(addToFavorite);
router.route("/").get(getAllFavorite);
router.route("/:id").get(getFavorite);
router.route("/:id").delete(removeFromFavorite)

export default router;