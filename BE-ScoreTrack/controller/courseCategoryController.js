import db from '../models/index.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await db.CourseCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await db.CourseCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Error creating category', error: err.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const category = await db.CourseCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'Error updating category', error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await db.CourseCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};
