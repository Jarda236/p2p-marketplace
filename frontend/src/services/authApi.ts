import {axiosAuthInstance} from "./base";
import {User} from "../models";

interface LoginRequest {
    username: string,
    password: string
}

interface RegistrationRequest {
    name: string,
    email: string,
    phone: string,
    city: string,
    password_hash: string
}

type LoginResponse = {
    user: User,
    token: string | undefined
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    /*return {
        user: {
            id: "1",
            name: "username1",
            email: "user1@a.com",
            phone: 14433434343,
            city: "Brno",
            createdAt: 0,
            fundsAccount: {
                balance: 500,
                balanceBlocked: 300
            },
            rating: 4,
            image: "/icons/user.jpg"
        },
        token: "token"
    };*/
    const response = await axiosAuthInstance.post("users/login", data, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.data;
}

export const register = async (data: RegistrationRequest):Promise<void> => {
    const response = await axiosAuthInstance.post("users/register", data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data.data;
}

export const isAuthenticated = async ():Promise<User> => {
    /*return {
        id: "1",
        name: "username1",
        email: "user1@a.com",
        phone: 14433434343,
        city: "Brno",
        createdAt: 0,
        fundsAccount: {
            balance: 500,
            balanceBlocked: 300
        },
        rating: 4,
        image: "/icons/user.jpg"
    };*/
    const response = await axiosAuthInstance.get("auth", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}