import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';   // импортируем роутер

const app = createApp(App);
app.use(router);                // говорим Vue использовать роутер
app.mount('#app');