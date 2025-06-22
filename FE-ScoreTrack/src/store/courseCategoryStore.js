import api from '../services/api';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchCategories() {
      this.isLoading = true;
      try {
        const res = await api.get('/course-category');
        this.categories = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addCategory(data) {
      await api.post('/course-category', data);
      await this.fetchCategories();
    },
    async updateCategory(id, data) {
      await api.put(`/course-category/${id}`, data);
      await this.fetchCategories();
    },
    async deleteCategory(id) {
      await api.delete(`/course-category/${id}`);
      await this.fetchCategories();
    },
  },
});
