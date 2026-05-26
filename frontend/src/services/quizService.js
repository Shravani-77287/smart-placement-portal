import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz/';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: { Authorization: `Bearer ${user?.token}` }
  };
};

// Fetch 5 random questions
const getRandomQuestions = async () => {
  const response = await axios.get(API_URL + 'random', getAuthHeaders());
  return response.data;
};

export default {
  getRandomQuestions
};