import { defineStore } from 'pinia';
import api from '../services/api';

export const useGradeStore = defineStore('grade', {
  state: () => ({
    grades: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchGrades() {
      this.isLoading = true;
      try {
        const res = await api.get('/grades');
        this.grades = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async addGrade(payload) {
      this.isLoading = true;
      try {
        const res = await api.post('/grades', payload);
        this.grades.push(res.data);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updateGrade(grade) {
      this.isLoading = true;
      try {
        const res = await api.put(`/grades/${grade.id}`, grade);
        const index = this.grades.findIndex(g => g.id === grade.id);
        if (index !== -1) {
          this.grades[index] = res.data;
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteGrade(id) {
      this.isLoading = true;
      try {
        await api.delete(`/grades/${id}`);
        this.grades = this.grades.filter(g => g.id !== id);
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
