import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getGradesByUser
} from '../controller/studentController.js';

import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate); 

router.get('/', authorizeRole('admin', 'mentor'), getAllStudents);
router.get('/:id', authorizeRole('admin', 'mentor'), getStudentById);
router.post('/', authorizeRole('admin'), createStudent);
router.put('/:id', authorizeRole('admin'), updateStudent);
router.delete('/:id', authorizeRole('admin'), deleteStudent);

router.get('/grade/:studentId', getGradesByUser); 

export default router;
