import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companyService from '../services/companyService';
import authService from '../services/authService';

function AdminDashboard() {
  const navigate = useNavigate();
  const [allApplications, setAllApplications] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Security kick-out: If they aren't logged in OR aren't an admin, send them away!
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const fetchAllData = async () => {
      try {
        const data = await companyService.getAllCompaniesAdmin();
        setAllApplications(data);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
      }
    };
    
    fetchAllData();
  }, [user, navigate]);

  const onLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#343a40', padding: '15px 20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>🛡️ Placement Officer Portal</h1>
        <button onClick={onLogout} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <h2>All Student Applications ({allApplications.length})</h2>

      <div style={{ backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#444' }}>
              <th style={{ padding: '15px' }}>Student Name</th>
              <th style={{ padding: '15px' }}>Company</th>
              <th style={{ padding: '15px' }}>Role</th>
              <th style={{ padding: '15px' }}>Status</th>
              <th style={{ padding: '15px' }}>Resume</th>
            </tr>
          </thead>
          <tbody>
            {allApplications.map((app) => (
              <tr key={app._id} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{app.user?.name || 'Unknown Student'}</td>
                <td style={{ padding: '15px' }}>{app.companyName}</td>
                <td style={{ padding: '15px' }}>{app.role}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ backgroundColor: '#007bff', padding: '5px 10px', borderRadius: '12px', fontSize: '12px' }}>{app.status}</span>
                </td>
                <td style={{ padding: '15px' }}>
                  {app.user?.resume ? (
                    <a href={`http://localhost:5000${app.user.resume}`} target="_blank" rel="noreferrer" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>📄 View PDF</a>
                  ) : (
                    <span style={{ color: '#aaa' }}>No File</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;