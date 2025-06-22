<template>
  <div class="p-6">

    <div v-if="studentStore.isLoading">Loading...</div>
    <div v-if="studentStore.error" class="text-red-500">{{ studentStore.error }}</div>

    <StudentTable :students="studentStore.students" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStudentStore } from '../store/studentStore';
import StudentTable from '../components/StudentTable.vue';

const studentStore = useStudentStore();
onMounted(() => {
  studentStore.fetchStudents();
});
</script>
