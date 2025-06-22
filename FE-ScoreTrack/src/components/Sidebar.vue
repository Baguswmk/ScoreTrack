<template>
  <div :class="[
    'transition-all duration-300 z-10',
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-md',
    isSidebarOpen ? 'w-64' : 'w-20',
    'md:h-screen h-auto fixed md:relative bottom-0 md:bottom-auto w-full md:w-auto flex md:flex-col'
  ]">
    <!-- Sidebar Header - Desktop -->
    <div class="hidden md:flex items-center justify-between p-4 border-b"
      :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
      <div class="flex items-center space-x-3" :class="{ 'justify-center w-full': !isSidebarOpen }">
      <img src="https://dummyimage.com/100x100/000/fff.png&text=Logo" alt="Dummy Logo"
 class="h-8 w-8">
        <h1 v-if="isSidebarOpen" class="font-bold text-lg">ScoreTrack</h1>
      </div>
      <button @click="$emit('toggleSidebar')" class="focus:outline-none cursor-pointer ">
        <el-icon v-if="isSidebarOpen">
          <ArrowLeft />
        </el-icon>
        <el-icon v-else>
          <ArrowRight />
        </el-icon>
      </button>
    </div>

    <!-- Mobile Header -->
    <div class="md:hidden flex justify-between items-center p-4  "
      :class="isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <div class="flex items-center space-x-2">
        <img src="https://dummyimage.com/100x100/000/fff.png&text=Logo" alt="Dummy Logo" class="h-8 w-8">
        <h1 class="font-bold text-lg">ScoreTrack</h1>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <div class="flex flex-col md:flex-1 justify-between overflow-y-auto">
      <div class="py-4 flex md:flex-col flex-row md:space-y-1 justify-around md:justify-start">
        <button v-for="(item, index) in menuItems" :key="index" @click="$emit('selectMenu', item.name)" :class="[
          'flex items-center cursor-pointer transition-colors duration-200 whitespace-nowrap !rounded-button',
          activeMenuItem === item.name
            ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800')
            : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'),
          isSidebarOpen ? 'md:px-4 md:py-3 md:mx-3 rounded-lg justify-start' : 'md:justify-center md:p-3 md:mx-2 rounded-lg',
          'p-2'
        ]">
          <el-icon class="text-xl">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="isSidebarOpen" class="ml-3 md:inline hidden">{{ item.name }}</span>
        </button>
      </div>

      <!-- Sidebar Footer -->
      <div class="mt-auto p-4 border-t hidden md:block" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">

        <!-- Toggle Dark Mode -->
         <button @click="$emit('toggleDarkMode')" :class="[
          'flex items-center cursor-pointer transition-colors duration-200 whitespace-nowrap !rounded-button',
          isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
          isSidebarOpen ? 'px-4 py-3 mx-3 rounded-lg justify-start' : 'justify-center p-3 mx-2 rounded-lg'
        ]">
          <el-icon v-if="isDarkMode">
            <Sunny />
          </el-icon>
          <el-icon v-else>
            <Moon />
          </el-icon>
          <span v-if="isSidebarOpen" class="ml-3">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>

        <!-- Logout Button -->
        <button @click="handleLogout" :class="[
          'flex items-center cursor-pointer mt-4 p-2 rounded-lg text-red-500',
          isSidebarOpen ? 'px-4 py-3 mx-3' : 'justify-center',
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        ]">
          <el-icon><Back /></el-icon>
          <span v-if="isSidebarOpen" class="ml-3">Logout</span>
        </button>

     
      </div>

    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ArrowRight, Close, Menu, Sunny, Moon,  Back } from '@element-plus/icons-vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  router.push('/login');
};

defineProps({
  isSidebarOpen: Boolean,
  isDarkMode: Boolean,
  activeMenuItem: String,
  menuItems: Array
});
</script>
