import axios from 'axios';

//baseURL: 'http://localhost:3002/api',
const instance = axios.create({
   //baseURL: 'https://posts-api-three.vercel.app/api',
   baseURL: 'http://localhost:3002/api',
})

// Добавляємо до кожного запросу токен
instance.interceptors.request.use((config) => {
   config.headers.Authorization = window.localStorage.getItem('token');

   return config;
});

export default instance;