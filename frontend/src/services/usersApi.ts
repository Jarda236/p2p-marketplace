import axiosInstance from "./base";
import {User} from "../models";

const USERS = [
    {
        id: "1",
        name: "name1",
        username: "user1",
        createdAt: 0,
        cashAmount: 500
    },
    {
        id: "2",
        name: "name2",
        username: "user2",
        createdAt: 0,
        cashAmount: 5000
    }
]

export const getUsers = async (): Promise<Array<User>> => {
    return USERS;

    const response = await axiosInstance.get('/users');
    return response.data;
}

export const getUserById = async (userId: string): Promise<User | null> => {
    return USERS.find(user => user.id === userId) ?? null;

    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
}