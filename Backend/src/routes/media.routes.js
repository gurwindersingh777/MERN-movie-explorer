import { Router } from "express";
import {
  getMediaCategory,
  getMediaDetails,
  getMediaSearch,
  getMediaCredits,
  getMediaVideos,
  getMediaSimilar,
  getMediaRecommendations,
  getMediaTrending,
  getMediaDiscover,
  getMediaReviews,
  getMediaWatchProvider,
  getMediaGenre
} from "../controllers/media.controllers.js";

const router = Router();

router.get("/trending/:media_type/:time_window", getMediaTrending);
router.get("/multi/search", getMediaSearch);
router.get("/:type/discover", getMediaDiscover);
router.get("/:type/genres", getMediaGenre);

router.get("/:type/:id/credits", getMediaCredits);
router.get("/:type/:id/videos", getMediaVideos);
router.get("/:type/:id/similar", getMediaSimilar);
router.get("/:type/:id/recommendations", getMediaRecommendations);
router.get("/:type/:id/watch/providers", getMediaWatchProvider);
router.get("/:type/:id/reviews", getMediaReviews);
router.get("/:type/:id", getMediaDetails);

router.get("/:type/category/:category", getMediaCategory);

export default router;