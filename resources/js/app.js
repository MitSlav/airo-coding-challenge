import "./bootstrap";
import router from "./router";
import { createApp } from "vue";
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import App from "./App.vue";

const app = createApp(App).use(router);

app.config.globalProperties.$toast = iziToast;

app.mount('#app');

