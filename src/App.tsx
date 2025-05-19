import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegistPage from './pages/regist/RegistPage';
import './App.css';


function ButtonLog() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/login')}
      className="modern-button"
    >
      Войти
    </button>
  );
}

function ButtonRegist() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/regist')}
      className="modern-button"
    >
      Регистрация
    </button>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <div className="welcome-card">
              <h1>Добро пожаловать!</h1>
              <h3>Что бы продолжить выбери действие</h3>
              <ButtonLog />
              <ButtonRegist />
            </div>
          </div>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regist" element={<RegistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;