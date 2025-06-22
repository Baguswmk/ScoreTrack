<template>
  <div class="p-6">
    <div v-if="gradeStore.isLoading">Loading...</div>
    <div v-if="gradeStore.error" class="text-red-500">{{ gradeStore.error }}</div>
    <GradeTable :grades="gradeStore.grades" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGradeStore } from '../store/gradeStore';
import GradeTable from '../components/GradeTable.vue';

const gradeStore = useGradeStore();

onMounted(() => {
  gradeStore.fetchGrades();
});
</script>
