import axios from 'axios';

const API_URL = 'https://smart-placement-portal-gren.onrender.com/api/users/';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    headers: { Authorization: `Bearer ${user?.token}` }
  };
};

const addCompany = async (companyData) => {
  const response = await axios.post(API_URL, companyData, getAuthHeaders());
  return response.data;
};

const getCompanies = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

const updateStatus = async (companyId, status) => {
  const response = await axios.put(API_URL + companyId + '/status', { status }, getAuthHeaders());
  return response.data;
};

// --> ADD THIS NEW FUNCTION
const deleteCompany = async (companyId) => {
  const response = await axios.delete(API_URL + companyId, getAuthHeaders());
  return response.data;
};

// --> ADD THIS NEW FUNCTION
const getAllCompaniesAdmin = async () => {
  const response = await axios.get(API_URL + 'all', getAuthHeaders());
  return response.data;
};

// Update your export at the bottom to include it:
export default {
  addCompany,
  getCompanies,
  updateStatus,
  deleteCompany,
  getAllCompaniesAdmin // <-- Add this
};

