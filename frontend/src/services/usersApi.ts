import axiosInstance from "./base";
import {User} from "../models";

export const getUsers = async (): Promise<Array<User>> => {
    const response = await axiosInstance.get('/users', {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const getUserById = async (userId: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${userId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const addCash = async (amount: number): Promise<void> => {
    const response = await axiosInstance.post(`/users/add-cash/${amount}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}