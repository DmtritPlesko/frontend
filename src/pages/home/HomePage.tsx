import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [courses, setCourses] = useState([{ id: 1, title: 'Основы проксемики', lessons: 12, students: 45 }]);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // Загрузка курсов (замените на реальный API-запрос)
    useEffect(() => {
        // Пример данных - в реальности загружайте с бэкенда
        const mockCourses = [
            { id: 1, title: 'Основы проксемики', lessons: 12, students: 45 },
            { id: 2, title: 'Культурные различия', lessons: 8, students: 32 },
            { id: 3, title: 'Территориальность животных', lessons: 10, students: 28 }
        ];
        setCourses(mockCourses);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/');
    };

    const handleAddCourse = () => {
        if (newCourseTitle.trim()) {
            const newCourse = {
                id: courses.length + 1,
                title: newCourseTitle,
                lessons: 0,
                students: 0
            };
            setCourses([...courses, newCourse]);
            setNewCourseTitle('');
            setShowAddForm(false);
            
            // Здесь должен быть API-запрос к вашему бэкенду
            // axios.post('/api/courses', newCourse)...
        }
    };

    return (
        <div className="home-page">
            <div className="account-menu-wrapper">
                <div 
                    className="account-circle"
                    onClick={() => setShowMenu(!showMenu)}
                    onMouseEnter={() => setShowMenu(true)}
                >
                    <span className="account-icon">👤</span>
                </div>

                {showMenu && (
                    <div 
                        className="account-menu"
                        onMouseLeave={() => setShowMenu(false)}
                    >
                        <div 
                            className="menu-item"
                            onClick={() => {
                                navigate('/profile');
                                setShowMenu(false);
                            }}
                        >
                            Редактировать профиль
                        </div>
                        <div 
                            className="menu-item"
                            onClick={() => {
                                navigate('/evaluations');
                                setShowMenu(false);
                            }}
                        >
                            Оценки
                        </div>
                        <div 
                            className="menu-item"
                            onClick={() => {
                                navigate('/my_course');
                                setShowMenu(false);
                            }}
                        >
                            Мои курсы
                        </div>
                        <div 
                            className="menu-item logout"
                            onClick={handleLogout}
                        >
                            Выйти
                        </div>
                    </div>
                )}
            </div>
            
            <header className="header">
                <h1>ПРОСТРАНСТВЕННОЕ ПОВЕДЕНИЕ: ОБУЧАЮЩИЕ КУРСЫ</h1>
                <p>Изучайте проксемику через наши интерактивные курсы</p>
            </header>

            <main className="main-content">
                <div className="courses-header">
                    <h2>Доступные курсы</h2>
                    <button 
                        className="add-course-btn"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        + Добавить курс
                    </button>
                </div>

                {showAddForm && (
                    <div className="add-course-form">
                        <input
                            type="text"
                            value={newCourseTitle}
                            onChange={(e) => setNewCourseTitle(e.target.value)}
                            placeholder="Название нового курса"
                            className="course-input"
                        />
                        <div className="form-buttons">
                            <button 
                                className="save-btn"
                                onClick={handleAddCourse}
                            >
                                Сохранить
                            </button>
                            <button 
                                className="cancel-btn"
                                onClick={() => setShowAddForm(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                )}

                <div className="courses-grid">
                    {courses.map(course => (
                        <div key={course.id} className="course-card">
                            <div className="course-image">
                                <img 
                                    src={`https://picsum.photos/300/200?random=${course.id}`} 
                                    alt={course.title}
                                />
                            </div>
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <div className="course-stats">
                                    <span>Уроков: {course.lessons}</span>
                                    <span>Студентов: {course.students}</span>
                                </div>
                                <button 
                                    className="view-course-btn"
                                    onClick={() => navigate(`/course/${course.id}`)}
                                >
                                    Перейти к курсу
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="footer">
                <p>© {new Date().getFullYear()} Центр изучения проксемики</p>
            </footer>
        </div>
    );
}

export default HomePage;