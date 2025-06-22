<template>
  <div class="p-6">
    <div v-if="mentorStore.isLoading">Loading...</div>
    <div v-if="mentorStore.error" class="text-red-500">{{ mentorStore.error }}</div>
    <MentorTable :students="mentorStore.students" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMentorStore } from '../store/mentorStore';
import MentorTable from '../components/MentorTable.vue';

const mentorStore = useMentorStore();
onMounted(() => {
  mentorStore.fetchMentors();
});
</script>
