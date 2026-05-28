import axios from 'axios';

const API_URL = 'https://smart-placement-portal-gren.onrender.com/api/users/';

const uploadResume = async (formData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const response = await axios.post(API_URL + 'resume', formData, {
    headers: { 
      Authorization: `Bearer ${user?.token}`,
      // This line is the secret sauce! It tells the server to expect a file.
      'Content-Type': 'multipart/form-data' 
    }
  });
  
  return response.data;
};

export default {
  uploadResume
};