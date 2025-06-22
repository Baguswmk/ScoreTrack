import db from "../models/index.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    await db.sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await db.User.bulkCreate(
      [
        {
          name: "admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin",
        },
        {
          name: "mentor",
          email: "mentor@example.com",
          password: hashedPassword,
          role: "mentor",
        },
        {
          name: "mahendraUser",
          email: "mahendra@example.com",
          password: hashedPassword,
          role: "mentor",
        },
        {
          name: "sariUser",
          email: "sari@example.com",
          password: hashedPassword,
          role: "mentor",
        },
        {
          name: "student",
          email: "student@example.com",
          password: hashedPassword,
          role: "student",
        },
        {
          name: "budiUser",
          email: "budi@example.com",
          password: hashedPassword,
          role: "student",
        },
        {
          name: "citraUser",
          email: "citra@example.com",
          password: hashedPassword,
          role: "student",
        },
        {
          name: "deniUser",
          email: "deni@example.com",
          password: hashedPassword,
          role: "student",
        },
      ],
      { returning: true }
    );

    const adminUser = users[0];
    const mentorUser = users[1];
    const mahendraUser = users[2];
    const sariUser = users[3];
    const studentUser = users[4];
    const budiUser = users[5];
    const citraUser = users[6];
    const deniUser = users[7];

    const categories = await db.CourseCategory.bulkCreate([
      { name: "Programming" },
      { name: "Database" },
    ]);


    const mentors = await db.Mentor.bulkCreate(
      [
        { name: "Pak Budi", userId: mentorUser.id },
        { name: "Pak Mahendra", userId: mahendraUser.id },
        { name: "Bu Sari", userId: sariUser.id },
      ],
      { returning: true }
    );

    const students = await db.Student.bulkCreate(
      [
        { name: "Andi", userId: studentUser.id },
        { name: "Budi", userId: budiUser.id },
        { name: "Citra", userId: citraUser.id },
        { name: "Deni", userId: deniUser.id },
      ],
      { returning: true }
    );

    const semesters = await db.Semester.bulkCreate([
      {
        name: "Ganjil 2023",
        start_date: new Date("2023-08-01"),
        end_date: new Date("2023-12-31"),
      },
    ]);

    const courses = await db.Course.bulkCreate([
      {
        name: "Vue.js",
        mentorId: mentors[0].id,
        categoryId: categories[0].id,
      },
      {
        name: "React.js",
        mentorId: mentors[1].id,
        categoryId: categories[0].id,
      },
      {
        name: "Database Dasar",
        mentorId: mentors[2].id,
        categoryId: categories[1].id,
      },
    ]);

    await db.Grade.bulkCreate([
      {
        studentId: students[0].id,
        courseId: courses[0].id,
        semesterId: semesters[0].id,
        score: 85,
        feedback: "Good job!",
      },
      {
        studentId: students[0].id,
        courseId: courses[1].id,
        semesterId: semesters[0].id,
        score: 90,
        feedback: "Excellent!",
      },
      {
        studentId: students[1].id,
        courseId: courses[0].id,
        semesterId: semesters[0].id,
        score: 75,
        feedback: "Needs improvement.",
      },
      {
        studentId: students[2].id,
        courseId: courses[0].id,
        semesterId: semesters[0].id,
        score: 80,
        feedback: "Well done!",
      },
      {
        studentId: students[2].id,
        courseId: courses[1].id,
        semesterId: semesters[0].id,
        score: 88,
        feedback: "Great!",
      },
      {
        studentId: students[1].id,
        courseId: courses[1].id,
        semesterId: semesters[0].id,
        score: 83,
        feedback: "Solid performance.",
      },
      {
        studentId: students[3].id,
        courseId: courses[2].id,
        semesterId: semesters[0].id,
        score: 70,
        feedback: "Basic understanding.",
      },
      {
        studentId: students[0].id,
        courseId: courses[2].id,
        semesterId: semesters[0].id,
        score: 92,
        feedback: "Outstanding!",
      },
    ]);

    console.log("✅ All dummy data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error while seeding data:", error);
    process.exit(1);
  }
};

seed();
