import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types/authTypes';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}') as UserProfile;

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Üdvözöljük, {user.username}!</h2>
      <p>Felhasználói ID: {user.id}</p>
      <p>Szerepkör: {user.role}</p>
      {user.pfp_link && <img src={user.pfp_link} alt="Profilkép" style={{ width: '100px' }} />}
      <button onClick={handleLogout}>Kijelentkezés</button>
    </div>
  );
};

export default Dashboard;