import express from "express";
import {
  getAllGrades,
  createGrade,
  updateGrade,
  deleteGrade,
  getGradesByStudent,
} from "../controller/gradeController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", authorizeRole('admin', 'mentor'), getAllGrades);
router.post("/", authorizeRole('admin', 'mentor'), createGrade);
router.put("/:id", authorizeRole('admin', 'mentor'), updateGrade);
router.delete("/:id", authorizeRole('admin'), deleteGrade);
router.get("/student/:studentId", authorizeRole('admin', 'mentor'), getGradesByStudent);

export default router;
