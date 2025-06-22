import db from '../models/index.js';

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await db.Mentor.findAll();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching mentors', error: err.message });
  }
};

export const createMentor = async (req, res) => {
  try {
    const mentor = await db.Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ message: 'Error creating mentor', error: err.message });
  }
};

export const updateMentor = async (req, res) => {
  try {
    const mentor = await db.Mentor.findByPk(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    await mentor.update(req.body);
    res.json(mentor);
  } catch (err) {
    res.status(400).json({ message: 'Error updating mentor', error: err.message });
  }
};

export const deleteMentor = async (req, res) => {
  try {
    const mentor = await db.Mentor.findByPk(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    await mentor.destroy();
    res.json({ message: 'Mentor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting mentor', error: err.message });
  }
};
