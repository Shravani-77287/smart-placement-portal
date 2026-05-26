import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '10px' }}>Why Use Smart Placement Portal?</h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Your all-in-one centralized hub for conquering placement season.</p>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Feature 1 */}
        <div style={{ padding: '25px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '5px solid #007bff' }}>
          <h3 style={{ color: '#fff', marginTop: 0, fontSize: '1.3rem' }}>📊 Centralized Tracker</h3>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>Ditch the messy Excel sheets. Log your applications, track your interview stages, and never miss a deadline again.</p>
        </div>

        {/* Feature 2 */}
        <div style={{ padding: '25px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '5px solid #28a745' }}>
          <h3 style={{ color: '#fff', marginTop: 0, fontSize: '1.3rem' }}>📝 Aptitude Quizzes</h3>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>Sharpen your quantitative and logical reasoning skills with randomized mock tests pulled straight from our database.</p>
        </div>

        {/* Feature 3 */}
        <div style={{ padding: '25px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '5px solid #17a2b8' }}>
          <h3 style={{ color: '#fff', marginTop: 0, fontSize: '1.3rem' }}>💡 Interview Flashcards</h3>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>Review the most common HR and Technical questions with expert "Pro-Tips" to help you structure the perfect answer.</p>
        </div>

        {/* Feature 4 */}
        <div style={{ padding: '25px', backgroundColor: '#222', borderRadius: '8px', borderLeft: '5px solid #f0ad4e' }}>
          <h3 style={{ color: '#fff', marginTop: 0, fontSize: '1.3rem' }}>📄 Resume Management</h3>
          <p style={{ color: '#ddd', lineHeight: '1.6' }}>Keep your latest, polished PDF resume securely stored on our servers so it is always ready to send to recruiters.</p>
        </div>

      </div>

      {/* Navigation Button */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '12px 30px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  );
}

export default About;