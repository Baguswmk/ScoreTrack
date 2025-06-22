<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold">My Grades</h2>
        <p class="text-gray-500 mt-1">Here are your course grades across semesters.</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Course</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Semester</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Feedback</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(grade, index) in grades"
              :key="grade.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 text-sm text-gray-700">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ grade.Course?.name || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ grade.semester?.name || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ grade.score }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ grade.feedback || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStudentStore } from '../store/studentStore';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const studentStore = useStudentStore();
const grades = ref([]);

onMounted(async () => {
  const studentId = authStore.user?.id;
  if (studentId) {
    const res = await studentStore.fetchGrade(studentId);
    grades.value = res.grades;
  } else {
    console.warn('Student ID not found in authStore');
  }
});
</script>
