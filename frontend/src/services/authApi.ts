import {axiosAuthInstance} from "./base";
import {User} from "../models";

type LoginRequest = {
    username: string;
    password: string;
};

type RegistrationRequest = {
    username: string;
    password: string;
};

type LoginResponse = {
    user: User,
    token: string
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
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
    /*TODO const loginRequest: LoginRequest = {
        username,
        password
    };
    const response = await axiosAuthInstance.post("login", loginRequest, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;*/
}

export const register = async (username: string, password: string):Promise<void> => {
    return;
    /*TODO const regRequest: RegistrationRequest = {
        username,
        password,
    };

    const response = await axiosAuthInstance.post("register", regRequest, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;*/
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