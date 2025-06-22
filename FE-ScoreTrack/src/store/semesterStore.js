// src/store/semesterStore.js
import { defineStore } from 'pinia';
import api from '../services/api'; // pastikan kamu punya axios instance di sini

export const useSemesterStore = defineStore('semester', {
  state: () => ({
    semesters: [],
  }),

  actions: {
    async fetchSemesters() {
      const res = await api.get('/semester');
      this.semesters = res.data;
    },

    async addSemester(semester) {
      const res = await api.post('/semester', semester);
      this.semesters.push(res.data);
    },

    async updateSemester(semester) {
      const res = await api.put(`/semester/${semester.id}`, semester);
      const index = this.semesters.findIndex((s) => s.id === semester.id);
      if (index !== -1) this.semesters[index] = res.data;
    },

    async deleteSemester(id) {
      await api.delete(`/semester/${id}`);
      this.semesters = this.semesters.filter((s) => s.id !== id);
    },
  },
});
