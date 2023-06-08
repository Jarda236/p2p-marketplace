import axios from 'axios';

export const axiosAuthInstance = axios.create({
    baseURL: `http://localhost:4000/api/`,
});

const axiosInstance = axios.create({
    baseURL: `http://localhost:4000/api/`,
});
export default axiosInstance;