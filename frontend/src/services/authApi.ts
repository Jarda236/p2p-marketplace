import {axiosAuthInstance} from "./base";
import {User} from "../models";

interface LoginRequest {
    name: string,
    password: string
}

interface RegistrationRequest {
    name: string,
    email: string,
    phone: number,
    city: string,
    password: string
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
    const response = await axiosAuthInstance.post("login", data, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    const header = response.headers["set-cookie"]?.toString();
    const token = header?.substring(((header?.indexOf("=") ?? 0) + 1), (header?.indexOf(";")));
    return {user: response.data, token: token};
}

export const register = async (data: RegistrationRequest):Promise<void> => {
    const response = await axiosAuthInstance.post("register", data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;
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
    const response = await axiosAuthInstance.get("", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data;
}