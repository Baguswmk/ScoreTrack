<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">Welcome to ScoreTrack Dashboard</h2>
      <p class="text-gray-500 mt-1">Visual insights about students, courses, and grades.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-500 text-sm font-medium">Total Students</div>
        <div class="text-3xl font-bold text-gray-800 mt-2">{{ stats.students }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-500 text-sm font-medium">Total Courses</div>
        <div class="text-3xl font-bold text-gray-800 mt-2">{{ stats.courses }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="text-gray-500 text-sm font-medium">Average Grade</div>
        <div class="text-3xl font-bold text-gray-800 mt-2">{{ stats.averageGrade }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="showCharts">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Grade Trends</h3>
        <div ref="gradeChart" class="h-64 w-full"></div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Student Distribution</h3>
        <div ref="studentChart" class="h-64 w-full"></div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '../store/authStore';

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();

const role = computed(() => authStore.user?.role || 'student');
    
const showCharts = computed(() => {
  return role.value === 'admin' || role.value === 'mentor';
});


const gradeChart = ref(null);
const studentChart = ref(null);
const stats = computed(() => dashboardStore.stats);
const gradeTrends = computed(() => dashboardStore.gradeTrends);
const studentDistribution = computed(() => dashboardStore.studentDistribution);

const loadCharts = () => {
  if (gradeChart.value && gradeTrends.value.length > 0) {
    const months = gradeTrends.value.map(item => item.month);
    const averages = gradeTrends.value.map(item => parseFloat(item.avg));

    const gradeChartInstance = echarts.init(gradeChart.value);
    gradeChartInstance.setOption({
      title: { text: 'Average Grades Over Time' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: months,
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Average Grade',
          data: averages,
          type: 'line',
          smooth: true,
        },
      ],
    });
  }

  if (studentChart.value && studentDistribution.value.length > 0) {
    const pieData = studentDistribution.value.map(item => ({
      value: item.count,
      name: item.course
    }));

    const studentChartInstance = echarts.init(studentChart.value);
    studentChartInstance.setOption({
      title: { text: 'Student Distribution by Course' },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: pieData,
        },
      ],
    });
  }
};
onMounted(async () => {
  await dashboardStore.fetchStats();
  if (showCharts.value) {
    await dashboardStore.fetchGradeTrends();
    await dashboardStore.fetchStudentDistribution();
    await nextTick();
    loadCharts();
  }
});


</script>
