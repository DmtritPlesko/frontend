import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('http://localhost:8081/api/v1/auth/login', { 
        email, 
        password 
      });
      
      // Сохраняем токен в localStorage
      localStorage.setItem('access_token', response.data);
      
      // Редирект после успешного входа
      navigate('/home');
    } catch (error) {
      setError('Неверный email или пароль');
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Вход в систему</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="modern-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;