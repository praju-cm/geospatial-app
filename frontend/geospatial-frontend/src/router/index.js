import { createRouter, createWebHistory } from 'vue-router';
import UserHome from '../views/UserHome.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import UserDashboard from '../views/UserDashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: UserHome },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/register', name: 'UserRegister', component: UserRegister },
  { path: '/dashboard', name: 'Dashboard', component: UserDashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
