import express from 'express';
import { getAllMentors, createMentor, updateMentor, deleteMentor } from '../controller/mentorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.use(authenticate);

router.get('/', getAllMentors);
router.post('/', createMentor);
router.put('/:id', updateMentor); 
router.delete('/:id', deleteMentor); 

export default router;
