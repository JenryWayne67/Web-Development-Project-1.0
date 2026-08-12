import { Router } from "express";
import { generateChatController, generateRecommendationsController } from "../controllers/recommendationController";

const router = Router();

router.post("/api/recommendations", generateRecommendationsController);
router.post("/api/chat", generateChatController);

export default router;
