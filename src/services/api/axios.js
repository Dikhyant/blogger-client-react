import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

const Axios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
