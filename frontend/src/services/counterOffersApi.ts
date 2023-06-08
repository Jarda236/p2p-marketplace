import axiosInstance from "./base";
import {CounterOffer, CounterOfferCreateBody, CounterOfferUpdateBody} from "../models";

export const getCounterOfferById = async (counterId: string): Promise<CounterOffer >=> {
    const response = await axiosInstance.get(`/counter-offer/${counterId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const getCounterOffersByOfferId = async (offerId: string): Promise<Array<CounterOffer>> => {
    const response = await axiosInstance.get(`/counter-offer/offer/${offerId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const getCounterOffersByBuyerId = async (buyerId: string): Promise<Array<CounterOffer>> => {
    const response = await axiosInstance.get(`/counter-offer/buyer/${buyerId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const createCounterOffer = async (counterOffer: CounterOfferCreateBody): Promise<void> => {
    console.log(counterOffer)
    const response = await axiosInstance.post("/counter-offer", counterOffer, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;
}

export const updateCounterOffer = async (counterId: string, counterOffer: CounterOfferUpdateBody): Promise<void> => {
    const response = await axiosInstance.put(`/counter-offer/${counterId}`, counterOffer, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;
}

export const acceptCounterOffer = async (counterId: string):Promise<void> => {
    const response = await axiosInstance.post(`/counter-offer/${counterId}/accept`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const declineCounterOffer = async (counterId: string):Promise<void> => {
    const response = await axiosInstance.post(`/counter-offer/${counterId}/decline`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}