import {axiosAuthInstance} from "./base";
import {User} from "../models";

interface LoginRequest {
    username: string,
    password: string
}

interface RegistrationRequest {
    username: string,
    email: string,
    phone: number,
    city: string,
    password: string

}

type LoginResponse = {
    user: User,
    token: string
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return {
        user: {
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
        token: "token"
    };
    /*const response = await axiosAuthInstance.post("login", data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;*/
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
    return {
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
    };
    /*TODO const response = await axiosAuthInstance.get("", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data;*/
}