import { defineStore } from 'pinia';
import api from '../services/api'; 

export const useMentorStore = defineStore('mentor', {
  state: () => ({
    mentors: [],
  }),
  actions: {
    async fetchMentors() {
      const res = await api.get('/mentors');
      this.mentors = res.data;
    },
    async addMentor(mentor) {
      const res = await api.post('/mentors', mentor);
      this.mentors.push(res.data);
    },
    async updateMentor(mentor) {
      const res = await api.put(`/mentors/${mentor.id}`, mentor);
      const index = this.mentors.findIndex((s) => s.id === mentor.id);
      if (index !== -1) this.mentors[index] = res.data;
    },
    async deleteMentor(id) {
      await api.delete(`/mentors/${id}`);
      this.mentors = this.mentors.filter((s) => s.id !== id);
    },
  },
});
