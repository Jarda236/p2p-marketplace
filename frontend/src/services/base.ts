import axios from 'axios';

export const axiosAuthInstance = axios.create({
    baseURL: `http://localhost:4000/api/`,
});

const createAxiosInstance = () => {
    return axios.create({
        baseURL: `http://localhost:4000/api/`,
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
}

export const updateTokenAndAxiosInstance = (newToken: string) => {
    localStorage.setItem('token', newToken);
    axiosInstance = createAxiosInstance();
}

let axiosInstance = createAxiosInstance();
export default axiosInstance;