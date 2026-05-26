import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Our data bank of questions and tips
const interviewData = [
  {
    category: 'HR & Behavioral',
    question: 'Tell me about yourself.',
    tip: 'Keep it professional. Use the Present-Past-Future formula: what you do now, your background/education, and what you are looking to do next.'
  },
  {
    category: 'HR & Behavioral',
    question: 'Tell me about a time you overcame a difficult challenge.',
    tip: 'Use the STAR method (Situation, Task, Action, Result). Focus heavily on the Action YOU took and the positive Result.'
  },
  {
    category: 'Technical (MERN)',
    question: 'What is the Virtual DOM in React?',
    tip: 'It is a lightweight copy of the actual DOM. React uses it to compare changes (diffing) and only updates the real DOM where absolutely necessary, making apps much faster.'
  },
  {
    category: 'Technical (MERN)',
    question: 'Explain the difference between SQL and NoSQL databases.',
    tip: 'SQL (like MySQL) is relational and uses fixed tables and schemas. NoSQL (like MongoDB) is non-relational, document-based, and highly flexible with unstructured data.'
  },
  {
    category: 'Technical (MERN)',
    question: 'What is a JWT and how does it work?',
    tip: 'JSON Web Token. It is used for secure authentication. The server generates it upon login, the client stores it, and sends it in the header of subsequent requests to prove their identity.'
  }
];

function Interview() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  // Get unique categories for our filter buttons
  const categories = ['All', ...new Set(interviewData.map(item => item.category))];

  // Filter questions based on selected category
  const filteredQuestions = activeCategory === 'All' 
    ? interviewData 
    : interviewData.filter(item => item.category === activeCategory);

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#fff' }}>Mock Interview Prep</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }}
        >
          Back to Dashboard
        </button>
      </div>
      
      <p style={{ color: '#ccc', marginBottom: '30px' }}>Practice your answers to the most common industry questions. Click a question to reveal tips on how to answer it!</p>

      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              backgroundColor: activeCategory === category ? '#007bff' : '#444',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredQuestions.map((item, index) => (
          <div key={index} style={{ border: '1px solid #555', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#222' }}>
            
            {/* The Question (Clickable) */}
            <div 
              onClick={() => toggleExpand(index)}
              style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: '#333' }}
            >
              <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{item.question}</h3>
              <span style={{ color: '#007bff', fontSize: '24px', fontWeight: 'bold' }}>
                {expandedId === index ? '−' : '+'}
              </span>
            </div>

            {/* The Tip (Hidden by default) */}
            {expandedId === index && (
              <div style={{ padding: '20px', backgroundColor: '#2a2a2a', borderTop: '1px solid #555' }}>
                <p style={{ margin: 0, color: '#28a745', fontWeight: 'bold', marginBottom: '5px' }}>💡 Pro-Tip:</p>
                <p style={{ margin: 0, color: '#ddd', lineHeight: '1.6' }}>{item.tip}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Interview;