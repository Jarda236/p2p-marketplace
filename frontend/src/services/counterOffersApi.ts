import axiosInstance from "./base";
import {CounterOffer, CounterOfferCreateBody, CounterOfferUpdateBody} from "../models";

export const getCounterOfferById = async (counterId: string): Promise<CounterOffer >=> {
    const response = await axiosInstance.get(`/counter-offers/${counterId}`);
    return response.data.data;
}

export const getCounterOffersByOfferId = async (offerId: string): Promise<Array<CounterOffer>> => {
    const response = await axiosInstance.get(`/counter-offers/offer/${offerId}`);
    return response.data.data;
}

export const getCounterOffersByBuyerId = async (buyerId: string): Promise<Array<CounterOffer>> => {
    const response = await axiosInstance.get(`/counter-offers/buyer/${buyerId}`);
    return response.data.data;
}

export const createCounterOffer = async (counterOffer: CounterOfferCreateBody): Promise<void> => {
    const response = await axiosInstance.post("/counter-offers", counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data.data;
}

export const updateCounterOffer = async (counterId: string, counterOffer: CounterOfferUpdateBody): Promise<void> => {
    const response = await axiosInstance.put(`/counter-offers/${counterId}`, counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data.data;
}

export const acceptCounterOffer = async (counterId: string):Promise<void> => {
    const response = await axiosInstance.post(`/counter-offer/${counterId}/accept`);
    return response.data.data;
}

export const declineCounterOffer = async (counterId: string):Promise<void> => {
    const response = await axiosInstance.post(`/counter-offer/${counterId}/decline`);
    return response.data.data;
}