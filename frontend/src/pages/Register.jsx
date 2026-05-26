import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
  const navigate = useNavigate();
  // 1. Add adminCode to our state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    adminCode: '' 
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.register(formData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#222', borderRadius: '8px', color: '#fff', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>
      {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
      
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          onChange={handleInputChange} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          onChange={handleInputChange} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password (min 6 characters)" 
          onChange={handleInputChange} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />
        
        <hr style={{ borderColor: '#444', width: '100%', margin: '10px 0' }} />
        
        {/* 2. Optional Admin Code Field */}
        <label style={{ fontSize: '12px', color: '#aaa' }}>Optional: Staff Access Code</label>
        <input 
          type="password" 
          name="adminCode" 
          placeholder="Leave blank if student" 
          onChange={handleInputChange} 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff' }}
        />

        <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          Register
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
      </p>
    </div>
  );
}

export default Register;