import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Students from '../views/Students.vue';
import Courses from '../views/Course.vue';
import Grades from '../views/Grades.vue';
import DefaultLayout from '../views/Home.vue';
import Mentor from '../views/Mentor.vue';
import MyGrades from '../views/MyGrade.vue';
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/dashboard', component: Dashboard },
      { path: '/students', component: Students },
      { path: '/courses', component: Courses },
      { path: '/grades', component: Grades },
      { path: '/mentor', component: Mentor },
      { path: '/my-grades', component: MyGrades },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (authRequired && !token) {
    return next('/login');
  }

  if (to.path === '/login' && token) {
    return next('/dashboard');
  }

  const allowedRoles = to.meta.roles;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return next('/dashboard');
  }

  next();
});


export default router;
