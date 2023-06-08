import axiosInstance from "./base";
import {Offer, OfferCreateBody, OfferUpdateBody} from "../models";

export const getOffers = async (): Promise<Array<Offer>> => {
    const response = await axiosInstance.get('/offers', {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const getOfferById = async (offerId: string): Promise<Offer | null> => {
    const response = await axiosInstance.get(`/offers/${offerId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const createOffer = async (offer: OfferCreateBody): Promise<void> => {
    console.log(offer);
    const response = await axiosInstance.post("/offers", offer, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    console.log(response)
    return response.data.data;
}
export const deleteOfferById = async (offerId: string): Promise<void> => {
    const response = await axiosInstance.delete(`/offers/${offerId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const updateOffer = async (offerId: string, offer: OfferUpdateBody): Promise<void> => {
    const response = await axiosInstance.put(`/offers/${offerId}`, offer, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
    return response.data.data;
}

export const offerBuy = async (offerId: string): Promise<void> => {
    const response = await axiosInstance.post(`/offers/${offerId}/buy`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}