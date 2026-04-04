import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LibraryView from '../views/LibraryView.vue';
import EditorView from '../views/EditorView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/characters', name: 'library', component: LibraryView },
  { path: '/character/:id', name: 'editor', component: EditorView, props: true },
  // для создания нового персонажа используем тот же компонент, но id = 'new'
  { path: '/character/new', name: 'new-character', component: EditorView, props: { id: 'new' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;