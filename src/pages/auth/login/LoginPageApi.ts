// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Базовый URL вашего бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;