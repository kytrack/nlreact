import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types/authTypes';
import apiClient from '../utils/ApiClient';
import './Dashboard.css';
import Navbar from '../Components/Navbar';

interface Workout {
  id: number;
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
  gif: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}') as UserProfile;

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/login');
      return;
    }
    const fetchWorkouts = async () => {
      try {
        const response = await apiClient.get('GetTodayPlans', {
          params: { user_id: user.id }
        });

        setWorkouts(response.data.workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    if (user.id) fetchWorkouts();
  }, [navigate, user.id]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-header">
        <div className="profile-section">
          {user.pfp_link && (
            <img 
              src={user.pfp_link} 
              alt="Profilkép" 
              className="profile-image"
            />
          )}
          <h2 className="welcome-text">Üdvözöljük, {user.username}!</h2>
        </div>

        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          Kijelentkezés
        </button>
      </div>

      {!selectedWorkout ? (
        <>
          <h1 className="today-workouts-title">Mai napi edzéseid:</h1>
          <div className="workouts-grid">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => setSelectedWorkout(workout)}
                className="workout-card"
              >
                <h3 className="workout-title">{workout.name}</h3>
                <p className="workout-exercises-count">
                  {workout.exercises.length} gyakorlat
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button 
            onClick={() => setSelectedWorkout(null)}
            className="back-btn"
          >
            Vissza
          </button>
          <h1 className="today-workouts-title">{selectedWorkout.name}</h1>
          <div className="exercises-container">
            {selectedWorkout.exercises.map((exercise) => (
              <div 
                key={exercise.id}
                className="exercise-card"
              >
                <h4 className="exercise-title">{exercise.name}</h4>
                <img 
                  src={exercise.gif} 
                  alt={exercise.name}
                  className="exercise-gif"
                /> 
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;