import axios from 'axios';

export const axiosAuthInstance = axios.create({
    baseURL: `http://localhost:4000/api/auth/`,
});

const axiosInstance = axios.create({
    baseURL: `http://localhost:4000/api/`,
    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
});
export default axiosInstance;