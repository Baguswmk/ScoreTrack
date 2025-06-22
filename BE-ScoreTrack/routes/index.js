import express from 'express';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';
import mentorRoutes from './mentorRoutes.js';
import courseRoutes from './courseRoutes.js';
import gradeRoutes from './gradeRoutes.js';
import semesterRoutes from './semesterRoutes.js';
import courseCategoryRoutes from './courseCategory.js';
import dashboardRoutes from './dashboardRoutes.js';

import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/students', authenticate, authorizeRole('admin', 'mentor', 'student'), studentRoutes);
router.use('/mentors', authenticate, authorizeRole('admin'), mentorRoutes);
router.use('/courses', authenticate, authorizeRole('admin', 'mentor'), courseRoutes);
router.use('/grades', authenticate, authorizeRole('admin', 'mentor'), gradeRoutes);
router.use('/semester', authenticate, authorizeRole('admin', 'mentor'), semesterRoutes);
router.use('/course-category', authenticate, authorizeRole('admin'), courseCategoryRoutes);
router.use('/dashboard', authenticate,  dashboardRoutes);

export default router;
