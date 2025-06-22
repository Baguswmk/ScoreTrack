import db from '../models/index.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await db.Course.findAll({
      include: [
        { model: db.Mentor },
        { model: db.CourseCategory }
      ]
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await db.Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error creating course', error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await db.Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Error updating course', error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await db.Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};
