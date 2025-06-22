import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000, 
  position: "top-right"
});
app.mount('#app')