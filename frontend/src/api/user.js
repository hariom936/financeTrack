import axios from 'axios';

const API = import.meta.env.VITE_AUTH_BASE_URL;

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API}/api/user/login`, { userEmail: email, password });
  return res.data;
};

export const getUserList = async (token) => {
  const res = await axios.get(`${API}/api/user/list?page=1&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
