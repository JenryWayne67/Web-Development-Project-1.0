import { Router } from "express";
import {
  getDeadlinesController,
  getProgramDetailsController,
  getProgramsController,
  getScholarshipsController,
  getUniversitiesController,
} from "../controllers/universityController";

const router = Router();

router.get("/api/universities", getUniversitiesController);
router.get("/api/programs", getProgramsController);
router.get("/api/programs/:id", getProgramDetailsController);
router.get("/api/scholarships", getScholarshipsController);
router.get("/api/deadlines", getDeadlinesController);

export default router;
