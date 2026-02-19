import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middlewares.js';
import { addToSearchhistory, getSearchhistory, removeFromSearchhistory } from '../controllers/searchhistory.controllers.js';

const router = Router();

router.use(verifyJWT);
router.route("/").post(addToSearchhistory);
router.route("/").get(getSearchhistory);
router.route("/:id").delete(removeFromSearchhistory);

export default router;