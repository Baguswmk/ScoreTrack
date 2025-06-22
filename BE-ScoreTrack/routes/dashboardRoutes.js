import express from 'express';
import {
  getDashboardData,
  getGradeTrends,
  getStudentDistribution
} from '../controller/dashboardController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/stats', getDashboardData);
router.get('/grade-trends', getGradeTrends);
router.get('/student-distribution', getStudentDistribution);

export default router;
