// src/pages/regist/RegistPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistPage.css'; // Создадим этот файл ниже

interface FormData {
  fullName: string;
  groupName: string;
  email: string;
  password: string;
  role: string;
}

const RegistPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    groupName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [error, setError] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  
  try {
    // Здесь будет запрос к API
    console.log('Данные для регистрации:', formData);
    navigate('/');
  } catch (err) {
    setError('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
    console.error('Registration error:', err);
  }
};

  return (
    <div className="regist-container">
      <div className="regist-card">
        <h1 className="regist-title">Регистрация</h1>
        
        <form onSubmit={handleSubmit} className="regist-form">
          <div className="form-group">
            <label htmlFor="fullName">ФИО</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="groupName">Имя группы</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
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

          <button type="submit" className="modern-button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistPage;