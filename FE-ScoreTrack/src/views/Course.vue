<template>
  <div class="p-6">
    <div v-if="courseStore.isLoading">Loading...</div>
    <div v-if="courseStore.error" class="text-red-500">{{ courseStore.error }}</div>
    <CourseTable :courses="courseStore.courses" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCourseStore } from '../store/courseStore';
import CourseTable from '../components/CourseTable.vue';

const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourses();
});
</script>
