import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import StudentModel from './Student.js';
import MentorModel from './Mentor.js';
import CourseModel from './Course.js';
import GradeModel from './Grade.js';
import UserModel from './User.js'; 
import CourseCategoryModel from './CourseCategory.js';
import SemesterModel from './Semester.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = StudentModel(sequelize, DataTypes);
db.Mentor = MentorModel(sequelize, DataTypes);
db.Course = CourseModel(sequelize, DataTypes);
db.Grade = GradeModel(sequelize, DataTypes);
db.User = UserModel(sequelize, DataTypes); 
db.CourseCategory = CourseCategoryModel(sequelize, DataTypes);
db.Semester = SemesterModel(sequelize, DataTypes);


db.Course.belongsTo(db.Mentor, { foreignKey: 'mentorId' });
db.Course.belongsTo(db.CourseCategory, { foreignKey: 'categoryId' });
db.Grade.belongsTo(db.Student, { foreignKey: 'studentId' });
db.Grade.belongsTo(db.Course, { foreignKey: 'courseId' });
db.Grade.belongsTo(db.Semester,  { foreignKey: 'semesterId', targetKey: 'id', as: 'semester' });
db.Student.belongsTo(db.User, { foreignKey: 'userId' });


db.Student.hasMany(db.Grade, { foreignKey: 'studentId' });
db.Mentor.hasMany(db.Course, { foreignKey: 'mentorId' });
db.Course.hasMany(db.Grade, { foreignKey: 'courseId' });
db.CourseCategory.hasMany(db.Course, { foreignKey: 'categoryId' });
db.Semester.hasMany(db.Grade, { foreignKey: 'semesterId' });

db.User.hasOne(db.Student, { foreignKey: 'userId' });


export default db;
