import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/ApiClient';
import { LoginData } from '../types/authTypes';
import { hashPasswordWithSHA256 } from '../utils/hashUtils';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    hashed_password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const hashedPassword = await hashPasswordWithSHA256(formData.hashed_password);

      const response = await apiClient.post('JWTLogin', {
        email: formData.email,
        hashed_password: hashedPassword
      });
      
      if (response.data.succeed) {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Bejelentkezési hiba történt');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Üdvözöljük</h1>
          <p>Kérjük, jelentkezzen be fiókjába</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email cím</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="pelda@email.com"
                required
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Jelszó</label>
            </div>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={formData.hashed_password}
                onChange={(e) => setFormData({ ...formData, hashed_password: e.target.value })}
                placeholder="••••••••"
                required
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
        </form>
        
        {/* <div className="register-section">
          <p>Még nincs fiókja? <a href="/regisztracio">Regisztráljon most</a></p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;