import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';

function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await quizService.getRandomQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to load questions', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerClick = (option) => {
    if (isAnswered) return; // Prevent clicking multiple times

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  // 1. LOADING STATE
  if (questions.length === 0) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Quiz...</h2>;
  }

  // 2. RESULTS STATE
  if (showResults) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>Quiz Complete!</h2>
        <h3 style={{ textAlign: 'center', color: '#007bff' }}>Your Score: {score} / {questions.length}</h3>
        
        <div style={{ marginTop: '30px' }}>
          <h4>Review your answers:</h4>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '15px', borderLeft: '4px solid #007bff', backgroundColor: 'white' }}>
              <p><strong>Q: {q.questionText}</strong></p>
              <p style={{ color: 'green' }}>Correct Answer: {q.correctAnswer}</p>
              <p style={{ fontSize: '14px', color: '#555', fontStyle: 'italic' }}>Rationale: {q.explanation}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // 3. ACTIVE QUIZ STATE
  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#666' }}>
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Category: {currentQuestion.category}</span>
      </div>

      <h3 style={{ marginBottom: '20px' }}>{currentQuestion.questionText}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {currentQuestion.options.map((option, index) => {
          // Determine button colors based on answer state
          let bgColor = '#f0f0f0';
          if (isAnswered) {
            if (option === currentQuestion.correctAnswer) bgColor = '#d4edda'; // Green for correct
            else if (option === selectedAnswer) bgColor = '#f8d7da'; // Red for wrong selection
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={{
                padding: '15px', textAlign: 'left', border: '1px solid #ccc', borderRadius: '5px',
                backgroundColor: bgColor, cursor: isAnswered ? 'default' : 'pointer', fontSize: '16px',
                color: '#000000'
              }}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e2e3e5', borderRadius: '5px' }}>
          <p style={{ margin: 0, fontStyle: 'italic' }}><strong>Explanation:</strong> {currentQuestion.explanation}</p>
          <button 
            onClick={handleNextQuestion}
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {currentIndex + 1 === questions.length ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;