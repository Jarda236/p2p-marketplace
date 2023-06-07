import axios from 'axios';

export const axiosAuthInstance = axios.create({
    baseURL: `{env}/api/auth/`,
});

const axiosInstance = axios.create({
    baseURL: `{env}/api/`,
    headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
});
export default axiosInstance;