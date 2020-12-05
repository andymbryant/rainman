import { createApp } from 'vue';
import '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node-gpu';
import '@tensorflow/tfjs-core';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
