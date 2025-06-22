
# ScoreTrack - Student Performance Tracking App

ScoreTrack adalah sebuah aplikasi web yang dirancang untuk memantau performa akademik siswa. Aplikasi ini dibangun menggunakan Vite + Vue.js di sisi frontend, serta Express.js dan Sequelize dengan PostgreSQL di sisi backend. Untuk keamanan akses, aplikasi ini mengimplementasikan JWT (JSON Web Token). Visualisasi data ditampilkan secara interaktif menggunakan ECharts.

---

##  1. Penjelasan: Normalisasi Database

Normalisasi adalah proses untuk mengorganisasi data dalam sebuah database agar mengurangi redundansi dan ketergantungan data. Proses ini membagi tabel besar menjadi tabel-tabel kecil yang saling berelasi.

### Sebelum Dinormalisasi (Tabel Flat)
| ID | Student Name | Course Name | Mentor | Category | Score | Feedback | Semester |
|----|--------------|-------------|--------|----------|-------|----------|----------|
| 1  | John Doe     | Math        | Mr. A  | STEM     | 90    | Good     | Ganjil   |
| 2  | Jane Smith   | Math        | Mr. A  | STEM     | 85    | Nice     | Ganjil   |
| 3  | John Doe     | History     | Mr. B  | Humanities | 75   | OK       | Genap    |

Dari tabel di atas terdapat beberapa masalah, sebagai contoh yaitu : redundansi data (nama mentor, course dan kategori yang berulang-ulang), dan akan berdampak berkelanjutan dikarenakan menyulitkan untuk pemaruan data secara parsial.

### Setelah Dinormalisasi (RDBMS singkatan dari Relational Database Management System.)
RDBMS adalah sistem manajemen basis data yang menyimpan data dalam bentuk tabel-tabel yang saling berelasi.
**Tabel-Tabel:**
- `Students(id, name)`
- `Mentors(id, name)`
- `CourseCategories(id, name)`
- `Courses(id, name, mentorId, categoryId)`
- `Semesters(id, name, start_date, end_date)`
- `Grades(id, studentId, courseId, semesterId, score, feedback)`

Dengan struktur ini:
- Tidak ada duplikasi data
- Lebih mudah untuk query dan maintenance
- Relasi antar entitas jelas menggunakan foreign key

---

## 2. Teknologi yang Digunakan

### Backend
- Node.js + Express.js
- PostgreSQL (dengan Sequelize ORM)
- JWT Authentication (via `jsonwebtoken`)
- CORS & Helmet middleware
- RESTful API

### Frontend
- Vue.js 3 + Pinia
- Vue Router
- TailwindCSS
- ECharts untuk visualisasi chart
- Axios untuk komunikasi API

---

## 3. Fitur Utama

###  Autentikasi
- Sistem login berbasis JWT
- Role: admin, mentor, student

### Manajemen Data
- CRUD untuk:
  - Students
  - Courses
  - Grades
  - Mentors
  - Course Categories
  - Semesters

### Dashboard
- Menampilkan:
  - Total Students, Courses, dan Rata-rata Nilai
  - Grafik tren nilai per bulan
  - Distribusi siswa per mata pelajaran (Pie Chart)

---

## 4. Cara Menjalankan Proyek

### Clone Repository
```bash
git clone https://github.com/Baguswmk/ScoreTrack.git
cd ScoreTrack
```

### Backend Setup
```bash
cd BE-ScoreTrack
npm install
```

#### Ubah file `.env.example` menjadi `.env`
untuk isi dari file .env bisa melakukan copy paste kode di bawah ini dan lengkapi juga data datanya
```env
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
JWT_SECRET=
PORT=
CLIENT_URL=
```

#### Jalankan Seeder
```bash
npm run seed
```

#### Jalankan Server
```bash
npm run dev
```

### Frontend Setup
```bash
cd FE-ScoreTrack
npm install
```

#### Ubah file `.env.example` menjadi `.env`
untuk isi dari file .env bisa melakukan copy paste kode di bawah ini dan lengkapi juga data datanya
```env
VITE_API_BASE_URL=
```

#### Jalankan Frontend
```bash
npm run dev
```

---

## 5. File SQL Normalisasi

File: `normalization.sql`

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE course_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mentor_id INTEGER REFERENCES mentors(id),
  category_id INTEGER REFERENCES course_categories(id)
);

CREATE TABLE semesters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  semester_id INTEGER REFERENCES semesters(id),
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  feedback TEXT
);
```

---

---

## Author
> Bagus Widiatmoko  
> Email: baguswidiat42@gmail.com | GitHub: [@bagus-widiatmoko](https://github.com/bagus-widiatmoko)
