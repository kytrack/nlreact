import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/ApiClient';
import { LoginData } from '../types/authTypes';
import { hashPasswordWithSHA256 } from '../utils/hashUtils';

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    hashed_password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formData.hashed_password = await hashPasswordWithSHA256(formData.hashed_password);
      const response = await apiClient.post('JWTLogin', formData);
      console.log(formData);
      
      if (response.data.succeed) {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Bejelentkezési hiba történt');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Jelszó:</label>
          <input
            type="password"
            value={formData.hashed_password}
            onChange={(e) => setFormData({ ...formData, hashed_password: e.target.value })}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Belépés</button>
      </form>
    </div>
  );
};

export default Login;