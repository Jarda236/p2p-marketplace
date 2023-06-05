import axiosInstance from "./base";
import {User} from "../models";

const USERS: User[] = [
    {
        id: "1",
        name: "name1",
        username: "user1",
        createdAt: 0,
        cashAmount: 500,
        rating: 5
    },
    {
        id: "2",
        name: "name2",
        username: "user2",
        createdAt: 0,
        cashAmount: 5000,
        rating: 5
    }
]

export const getUsers = async (): Promise<Array<User>> => {
    return USERS;

    const response = await axiosInstance.get('/users');
    return response.data;
}

export const getUserById = /*async*/ (userId: string): /*Promise*/User => {
    return USERS.find(user => user.id === userId) ?? USERS[0];

    /*const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;*/
}