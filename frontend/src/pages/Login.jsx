import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Student Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;