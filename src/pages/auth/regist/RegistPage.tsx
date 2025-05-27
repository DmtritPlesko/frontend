import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistPage.css';

interface FormData {
  username: string;
  nameGroup: string;
  email: string;
  password: string;
  role: string;
}

const RegistPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    nameGroup: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Валидация email
    if (!validateEmail(formData.email)) {
      setError('Пожалуйста, введите корректный email');
      return;
    }

    // Валидация пароля
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = {
        username: formData.username,
        nameGroup: formData.nameGroup,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase()
      };

      // Отправка данных на сервер через axios
      const response = await axios.post(
        'http://localhost:8081/api/v1/auth/register', 
        registrationData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Аналог credentials: 'include' в fetch
        }
      );

      console.log('Успешная регистрация:', response.data);
      navigate('/login'); // Перенаправляем на страницу входа
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Ошибка при регистрации');
      } else {
        setError('Неизвестная ошибка');
      }
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="regist-container">
      <div className="regist-card">
        <h1 className="regist-title">Регистрация</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="regist-form">
          <div className="form-group">
            <label htmlFor="username">ФИО</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nameGroup">Имя группы</label>
            <input
              type="text"
              id="nameGroup"
              name="nameGroup"
              value={formData.nameGroup}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Роль</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="user">Пользователь</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="modern-button"
            disabled={isLoading}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistPage;