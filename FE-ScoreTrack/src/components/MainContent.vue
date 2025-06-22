<template>
  <div class="flex-1 transition-all duration-300 ml-1">
    <!-- Top Header -->
    <header class="sticky top-0 z-10 flex items-center justify-between p-3 border-b"
      :class="isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200 shadow-sm'">
      <div class="flex items-center">
        <h1 class="text-xl font-bold">Dashboard</h1>
        <p class="ml-4 text-sm hidden md:block" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          {{ formattedDate }}
        </p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative hidden md:block">
          <p class="flex items-center space-x-2 ">
            <img src="https://i.pravatar.cc/150?u=someone@example.com" alt="Avatar"
              class="w-8 h-8 rounded-full object-cover">
            <span class="hidden md:inline capitalize">{{ user.name }}</span>

          </p>

        </div>

        <button @click="$emit('toggleDarkMode')" class="md:hidden p-2 rounded-full cursor-pointer">
          <el-icon v-if="isDarkMode">
            <Sunny />
          </el-icon>
          <el-icon v-else>
            <Moon />
          </el-icon>
        </button>
      </div>
    </header>

    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, Bell, ArrowDown, Sunny, Moon } from '@element-plus/icons-vue';
import { useAuthStore } from '../store/authStore';

const props = defineProps({
  isSidebarOpen: Boolean,
  isDarkMode: Boolean,
});
const authStore = useAuthStore();

const user = computed(() => {
  return JSON.parse(localStorage.getItem('user')) || authStore.user || { email: 'Unknown' };
});
const formattedDate = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
);
</script>
