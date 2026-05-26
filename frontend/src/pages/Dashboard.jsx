import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import companyService from '../services/companyService';
import userService from '../services/userService';
import Analytics from '../components/Analytics'; // <-- Importing our new chart!

function Dashboard() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem('user');
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });
  
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ companyName: '', role: '' });
  
  // -- NEW STATE: For Search and Filtering --
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    if (!user) {
      navigate('/login');
    } else {
      fetchCompanies();
    }
  }, [user, navigate]);

  // -- NEW LOGIC: Filter the companies before displaying them --
  const filteredCompanies = companies.filter((company) => {
    // 1. Check if it matches the search bar
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.role.toLowerCase().includes(searchTerm.toLowerCase());
    // 2. Check if it matches the dropdown filter
    const matchesFilter = statusFilter === 'All' || company.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      const newCompany = await companyService.addCompany(formData);
      setCompanies([newCompany, ...companies]); 
      setFormData({ companyName: '', role: '' });
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

   // -- NEW LOGIC: Handle Status Dropdown Change --
  const handleStatusChange = async (companyId, newStatus) => {
    try {
      // 1. Tell the backend to update the database
      const updatedCompany = await companyService.updateStatus(companyId, newStatus);
      
      // 2. Update the React state so the UI changes instantly without a refresh!
      setCompanies(companies.map(company => 
        company._id === companyId ? updatedCompany : company
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // -- NEW LOGIC: Handle Deleting a Company --
  const handleDelete = async (companyId) => {
    // Show a browser confirmation popup so they don't delete by accident!
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await companyService.deleteCompany(companyId);
        
        // Remove it from the React state instantly
        setCompanies(companies.filter((company) => company._id !== companyId));
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  // Status Color Helper
  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return '#007bff';
      case 'Interviewing': return '#ffc107';
      case 'Offered': return '#28a745';
      case 'Rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // -- Resume Handlers (Unchanged) --
  const handleFileChange = (e) => { setFile(e.target.files[0]); setUploadMessage(''); };
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!file) { setUploadMessage('Please select a PDF file first.'); return; }
    const uploadData = new FormData();
    uploadData.append('resume', file);
    try {
      setUploadMessage('Uploading...');
      const response = await userService.uploadResume(uploadData);
      const updatedUser = { ...user, resume: response.resume };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setUploadMessage('Upload successful!');
      setFile(null);
    } catch (error) {
      setUploadMessage(error.response?.data?.message || 'Error uploading file.');
    }
  };

  const onLogout = () => { authService.logout(); navigate('/login'); };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Dashboard</h1>
        <div>
          {user?.role === 'admin' && (
            <button onClick={() => navigate('/admin')} style={{ padding: '8px 15px', cursor: 'pointer', marginRight: '10px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              🛡️ Admin Portal
            </button>
          )}
          <button onClick={() => navigate('/about')} style={{ padding: '8px 15px', cursor: 'pointer', marginRight: '10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px' }}>About the App</button>
          <button onClick={onLogout} style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Logout</button>
        </div>
      </div>
      {user && <h3 style={{ color: '#ccc' }}>Welcome back, {user.name}!</h3>}
      
      {/* Navigation Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={() => navigate('/quiz')} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Take a Practice Quiz</button>
        <button onClick={() => navigate('/interview')} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Mock Interview Prep</button>
      </div>

      <hr style={{ margin: '30px 0', borderColor: '#444' }}/>

      {/* --- RENDER THE NEW ANALYTICS CHART HERE --- */}
      <Analytics companies={companies} />

      {/* Add Company Form */}
      <div style={{ padding: '20px', backgroundColor: '#222', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: '#fff' }}>Log a New Application</h3>
        <form onSubmit={handleAddCompany} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input type="text" name="companyName" value={formData.companyName} placeholder="Company Name" onChange={handleInputChange} required style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}/>
          <input type="text" name="role" value={formData.role} placeholder="Role" onChange={handleInputChange} required style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}/>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add to Tracker</button>
        </form>
      </div>

      {/* --- NEW SEARCH AND FILTER CONTROLS --- */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search companies or roles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Company List (Now mapping over filteredCompanies instead of companies) */}
      <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, color: '#fff' }}>My Applications</h3>
        
        {filteredCompanies.length === 0 ? <p style={{ color: '#aaa' }}>No applications found matching your criteria.</p> : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredCompanies.map((company) => (
              <li key={company._id} style={{ borderBottom: '1px solid #444', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff', fontSize: '18px', display: 'block' }}>{company.companyName}</strong> 
                  <span style={{ color: '#aaa' }}>{company.role}</span>
                </div>
                
                {/* Right side controls: Dropdown + Delete Button */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <select
                    value={company.status}
                    onChange={(e) => handleStatusChange(company._id, e.target.value)}
                    style={{ 
                      backgroundColor: getStatusColor(company.status), 
                      padding: '5px 12px', 
                      borderRadius: '15px', 
                      fontSize: '14px', 
                      color: 'white', 
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="Applied" style={{ backgroundColor: '#222', color: '#fff' }}>Applied</option>
                    <option value="Interviewing" style={{ backgroundColor: '#222', color: '#fff' }}>Interviewing</option>
                    <option value="Offered" style={{ backgroundColor: '#222', color: '#fff' }}>Offered</option>
                    <option value="Rejected" style={{ backgroundColor: '#222', color: '#fff' }}>Rejected</option>
                  </select>

                  <button 
                    onClick={() => handleDelete(company._id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', fontSize: '14px' }}
                    title="Delete Application"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
        
          </ul>
        )}
      </div>

      {/* Resume Upload (Moved to bottom to keep main content up top) */}
      <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px', marginTop: '30px', color: '#333' }}>
        <h3 style={{ marginTop: 0 }}>Resume Management</h3>
        {user?.resume ? (
          <div style={{ marginBottom: '15px' }}>
            <p>✅ You have a resume on file.</p>
            <a href={`http://localhost:5000${user.resume}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>View My Resume</a>
          </div>
        ) : ( <p>❌ No resume uploaded yet.</p> )}
        <form onSubmit={handleResumeUpload} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Upload PDF</button>
        </form>
        {uploadMessage && <p style={{ marginTop: '10px', color: uploadMessage.includes('Error') ? 'red' : 'green', fontWeight: 'bold' }}>{uploadMessage}</p>}
      </div>

    </div>
  );
}

export default Dashboard;