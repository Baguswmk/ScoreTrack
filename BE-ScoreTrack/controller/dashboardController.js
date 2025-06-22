import db from '../models/index.js';
import { Sequelize } from 'sequelize';

export const getDashboardData = async (req, res) => {
  try {
    const students = await db.Student.count();
    const courses = await db.Course.count();

    const avgResult = await db.Grade.findAll({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'avg']],
      raw: true,
    });

    const averageGrade = parseFloat(avgResult[0].avg || 0).toFixed(2);

    res.json({ students, courses, averageGrade });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getGradeTrends = async (req, res) => {
  try {
    const result = await db.Grade.findAll({
      attributes: [
        [db.Sequelize.fn('TO_CHAR', db.Sequelize.col('created_at'), 'Mon'), 'month'],
        [db.Sequelize.fn('AVG', db.Sequelize.col('score')), 'avg']
      ],
      group: [db.Sequelize.fn('TO_CHAR', db.Sequelize.col('created_at'), 'Mon')],
      raw: true
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load grade trends' });
  }
};

export const getStudentDistribution = async (req, res) => {
  try {
    const result = await db.Grade.findAll({
      attributes: [
        [db.Sequelize.col('Course.name'), 'course'],
        [db.Sequelize.fn('COUNT', db.Sequelize.col('Grade.id')), 'count']
      ],
      include: [{ model: db.Course, attributes: [] }],
      group: ['Course.name'],
      raw: true
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load student distribution' });
  }
};
