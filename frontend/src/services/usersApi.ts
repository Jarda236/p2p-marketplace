import axiosInstance from "./base";
import {User} from "../models";

export const getUsers = async (): Promise<Array<User>> => {
    const response = await axiosInstance.get('/users');
    return response.data.data;
}

export const getUserById = async (userId: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data.data;
}