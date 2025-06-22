<template>
  <div :class="isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'" class="min-h-screen">
    <div class="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        :isSidebarOpen="isSidebarOpen"
        :isDarkMode="isDarkMode"
        :activeMenuItem="activeMenuItem"
        :menuItems="menuItems"
        @toggleSidebar="toggleSidebar"
        @toggleDarkMode="toggleDarkMode"
        @selectMenu="selectMenu"
      />
      <MainContent
        :isSidebarOpen="isSidebarOpen"
        :isDarkMode="isDarkMode"
        @toggleDarkMode="toggleDarkMode"
        @logout="logout"
      >
        <router-view />
      </MainContent>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRoute, useRouter } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import MainContent from '../components/MainContent.vue';
import { Grid, User, Collection, Document, UserFilled } from '@element-plus/icons-vue';

const isSidebarOpen = ref(true);
const isDarkMode = ref(false);
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const role = computed(() => authStore.user?.role || '');

const menuItems = computed(() => {
  if (role.value === 'admin') {
    return [
      { name: 'Dashboard', icon: Grid, path: '/dashboard' },
      { name: 'Students', icon: User, path: '/students' },
      { name: 'Courses', icon: Collection, path: '/courses' },
      { name: 'Grades', icon: Document, path: '/grades' },
      { name: 'Mentor', icon: UserFilled, path: '/mentor' },
    ];
  } else if (role.value === 'mentor') {
    return [
      { name: 'Dashboard', icon: Grid, path: '/dashboard' },
      { name: 'Students', icon: User, path: '/students' },
      { name: 'Grades', icon: Document, path: '/grades' },
    ];
  } else if (role.value === 'student') {
    return [
      { name: 'My Grades', icon: Document, path: '/my-grades' },
    ];
  } else {
    return [];
  }
});

const activeMenuItem = ref('Dashboard');

watch(
  () => route.path,
  (path) => {
    const found = menuItems.value.find((item) => item.path === path);
    activeMenuItem.value = found ? found.name : '';
  },
  { immediate: true }
);

const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);
const toggleDarkMode = () => (isDarkMode.value = !isDarkMode.value);

const selectMenu = (menu) => {
  const found = menuItems.value.find((item) => item.name === menu);
  if (found) router.push(found.path);
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>


