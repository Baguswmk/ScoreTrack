import db from "../models/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await db.Student.findAll();
    res.json(students);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching student", error: err.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await db.Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating student", error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.update(req.body);
    res.json(student);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating student", error: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.destroy();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: err.message });
  }
};
export const getGradesByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const student = await db.Student.findOne({ where: { userId } });

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found for this user" });
    }

    const grades = await db.Grade.findAll({
      where: { studentId: student.id },
      include: [
        { model: db.Course, attributes: ["name"] },
        { model: db.Semester, as: "semester", attributes: ["name"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      studentName: student.name,
      grades,
    });
  } catch (err) {
    console.error("Error fetching grades:", err);
    res.status(500).json({ message: "Error retrieving grades" });
  }
};
