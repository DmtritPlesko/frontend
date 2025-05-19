import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',  // URL вашего API Gateway
  withCredentials: true,  // Для куков (если используете HttpOnly)
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';  // Перенаправление на логин
    }
    return Promise.reject(error);
  }
);

export default api;