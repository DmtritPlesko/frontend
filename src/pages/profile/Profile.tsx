import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Используем ваши стили (переименовал .regist-container в .profile-container)

interface UserData {
  fullName: string;
  groupName: string;
  email: string;
  password: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    groupName: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Загрузка данных пользователя (замените на реальный API-запрос)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8082/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (err) {
        setError('Не удалось загрузить данные профиля');
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('access_token');
      
      await axios.put('http://localhost:8082/api/v1/user/update', userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      setIsEditing(false);
      // Можно добавить уведомление об успешном обновлении
    } catch (err) {
      setError('Ошибка при обновлении данных');
      console.error('Ошибка обновления:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isEditing) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Загрузка данных...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Мой профиль</h2>
        
        {error && (
          <div className="error-message" style={{ color: '#f44336', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">ФИО</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="groupName">Группа</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={userData.groupName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Новый пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Оставьте пустым, если не хотите менять"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="modern-button"
                disabled={isLoading}
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button 
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">ФИО:</span>
              <span className="info-value">{userData.fullName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Группа:</span>
              <span className="info-value">{userData.groupName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>

            <button 
              className="modern-button edit-button"
              onClick={() => setIsEditing(true)}
            >
              Редактировать профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;