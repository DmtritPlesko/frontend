import { BrowserRouter, Routes, Route, useNavigate, Navigate,Outlet } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import RegistPage from './pages/auth/regist/RegistPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/Profile'
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

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

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
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/regist" element={<RegistPage />} />
        
        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Добавьте сюда другие защищенные маршруты */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;