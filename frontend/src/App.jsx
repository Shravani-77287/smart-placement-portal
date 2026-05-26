import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Interview from './pages/Interview';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;