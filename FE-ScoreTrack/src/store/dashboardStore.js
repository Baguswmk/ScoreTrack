import { defineStore } from 'pinia';
import api from '../services/api';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: { students: 0, courses: 0, averageGrade: 0 },
    gradeTrends: [],
    studentDistribution: []
  }),
  actions: {
    async fetchStats() {
      const res = await api.get('/dashboard/stats');
      this.stats = res.data;
      console.log('Dashboard stats fetched:', this.stats);
    },
    async fetchGradeTrends() {
      const res = await api.get('/dashboard/grade-trends');
      this.gradeTrends = res.data; 
    },
    async fetchStudentDistribution() {
      const res = await api.get('/dashboard/student-distribution');
      this.studentDistribution = res.data; 
    }
  }
});
