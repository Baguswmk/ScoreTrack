import express from 'express';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../controller/courseController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorizeRole('admin', 'mentor'), getAllCourses);
router.post('/', authorizeRole('admin'), createCourse);
router.put('/:id', authorizeRole('admin', 'mentor'), updateCourse);
router.delete('/:id', authorizeRole('admin'), deleteCourse);

export default router;
