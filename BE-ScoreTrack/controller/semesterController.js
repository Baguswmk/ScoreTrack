import db from '../models/index.js';

export const getAllSemesters = async (req, res) => {
  try {
    const semesters = await db.Semester.findAll();
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching semesters', error: err.message });
  }
};

export const createSemester = async (req, res) => {
  try {
    const semester = await db.Semester.create(req.body);
    res.status(201).json(semester);
  } catch (err) {
    res.status(400).json({ message: 'Error creating semester', error: err.message });
  }
};

export const updateSemester = async (req, res) => {
  try {
    const semester = await db.Semester.findByPk(req.params.id);
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    await semester.update(req.body);
    res.json(semester);
  } catch (err) {
    res.status(400).json({ message: 'Error updating semester', error: err.message });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const semester = await db.Semester.findByPk(req.params.id);
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    await semester.destroy();
    res.json({ message: 'Semester deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting semester', error: err.message });
  }
};
