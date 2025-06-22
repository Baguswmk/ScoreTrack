import { defineStore } from 'pinia';
import api from '../services/api';

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    isLoading: false,
    error: null,
  }),

actions: {
  async fetchCourses() {
    this.isLoading = true;
    try {
      const res = await api.get('/courses');
      this.courses = res.data;
    } catch (err) {
      this.error = err.response?.data?.message || err.message;
    } finally {
      this.isLoading = false;
    }
  },

  async addCourse(courseData) {
    await api.post('/courses', courseData);
    await this.fetchCourses();
  },

  async updateCourse(id, courseData) {
    await api.put(`/courses/${id}`, courseData);
    await this.fetchCourses();
  },

  async deleteCourse(id) {
    await api.delete(`/courses/${id}`);
    await this.fetchCourses();
  },
}

});
