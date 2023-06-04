import axiosInstance from "./base";
import {Offer} from "../models";


export const getOffers = async (): Promise<Array<Offer>> => {
    return [
        {
            id: "1",
            createdAt: 0,
            amount: 100
        }
    ];

    const response = await axiosInstance.get('/offers');
    return response.data;
}