import axiosInstance from "./base";
import {User} from "../models";

const USERS: User[] = [
    {
        id: "1",
        username: "username1",
        email: "user1@a.com",
        phone: 14433434343,
        city: "Brno",
        createdAt: 0,
        account: {
          balance: 500,
          balanceBlocked: 300
        },
        rating: 4,
        image: "/icons/user.jpg"
    },
    {
        id: "2",
        username: "username2",
        email: "user2@a.com",
        phone: 14433434343,
        city: "Zilina",
        createdAt: 0,
        account: {
            balance: 500,
            balanceBlocked: 300
        },
        rating: 5,
        image: "/icons/user.jpg"
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