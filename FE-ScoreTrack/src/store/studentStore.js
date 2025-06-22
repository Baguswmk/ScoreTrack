// src/store/studentStore.js
import { defineStore } from 'pinia';
import api from '../services/api'; 

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
  }),
  actions: {
    async fetchStudents() {
      const res = await api.get('/students');
      this.students = res.data;
    },
    async addStudent(student) {
      const res = await api.post('/students', student);
      this.students.push(res.data);
    },
    async updateStudent(student) {
      const res = await api.put(`/students/${student.id}`, student);
      const index = this.students.findIndex((s) => s.id === student.id);
      if (index !== -1) this.students[index] = res.data;
    },
    async deleteStudent(id) {
      await api.delete(`/students/${id}`);
      this.students = this.students.filter((s) => s.id !== id);
    },
  async fetchGrade(id) {
  const res = await api.get(`/students/grade/${id}`);
  return res.data;
}

  },
});
