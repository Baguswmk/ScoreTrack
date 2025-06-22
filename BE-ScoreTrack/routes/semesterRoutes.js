import express from 'express';
import { getAllSemesters, createSemester,deleteSemester,updateSemester } from '../controller/SemesterController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.use(authenticate);

router.get('/', getAllSemesters);
router.post('/', createSemester);
router.put('/:id', updateSemester); 
router.delete('/:id', deleteSemester); 

export default router;
