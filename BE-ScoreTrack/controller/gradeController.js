import db from '../models/index.js';

export const getAllGrades = async (req, res) => {
  try {
    const grades = await db.Grade.findAll({
      include: [
        { model: db.Student },
        { model: db.Course, include: db.Mentor }
      ]
    });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grades', error: err.message });
  }
};

export const createGrade = async (req, res) => {
  try {
    const grade = await db.Grade.create(req.body);
    res.status(201).json(grade);
  } catch (err) {
    res.status(400).json({ message: 'Error creating grade', error: err.message });
  }
};

export const getGradesByStudent = async (req, res) => {
  try {
    const grades = await db.Grade.findAll({
      where: { studentId: req.params.studentId },
      include: [db.Course]
    });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student grades', error: err.message });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const grade = await db.Grade.findByPk(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    await grade.update(req.body);
    res.json(grade);
  } catch (err) {
    res.status(400).json({ message: 'Error updating grade', error: err.message });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const grade = await db.Grade.findByPk(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });

    await grade.destroy();
    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting grade', error: err.message });
  }
};

