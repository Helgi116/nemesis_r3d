import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// Определяем маршруты: путь -> компонент
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
];

// Создаём роутер с историей браузера (чтобы URL выглядел нормально)
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;