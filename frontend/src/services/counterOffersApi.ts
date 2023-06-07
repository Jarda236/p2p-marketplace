import axiosInstance from "./base";
import {CounterOffer, CounterOfferCreateBody, CounterOfferUpdateBody} from "../models";

const COUNTERS: CounterOffer[] = [
    {
        id: "1",
        offerId: "1",
        buyerId: "1",
        price: 43,
        status: null,
        itemsId: [
            "2"
        ]
    }
]

export const getCounterOfferById = async (counterId: string): Promise<CounterOffer >=> {
    /*return COUNTERS.find(c => c.id === counterId) ??
        {
            id: "1",
            offerId: "1",
            buyerId: "2",
            price: 43,
            status: null,
            itemsId: [
                "2"
            ]
        };*/
    const response = await axiosInstance.get(`/counter-offers/${counterId}`);
    return response.data
}

export const getCounterOffersByOfferId = async (offerId: string): Promise<Array<CounterOffer>> => {
    //return COUNTERS.filter(c => c.offerId === offerId);
    const response = await axiosInstance.get(`/counter-offers/offer/${offerId}`);
    return response.data
}

export const getCounterOffersByBuyerId = async (buyerId: string): Promise<Array<CounterOffer>> => {
    //return COUNTERS.filter(c => c.buyerId === buyerId);
    const response = await axiosInstance.get(`/counter-offers/buyer/${buyerId}`);
    return response.data
}

export const createCounterOffer = async (counterOffer: CounterOfferCreateBody): Promise<void> => {
    //return;

    const response = await axiosInstance.post("/counter-offers", counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export const updateCounterOffer = async (counterId: string, counterOffer: CounterOfferUpdateBody): Promise<void> => {
    //return;

    const response = await axiosInstance.put(`/counter-offers/${counterId}`, counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export const acceptCounterOffer = async (counterId: string):Promise<void> => {
    //return;
    const response = await axiosInstance.post(`/counter-offer/${counterId}/accept`);
    return response.data;
}

export const declineCounterOffer = async (counterId: string):Promise<void> => {
    //return;
    const response = await axiosInstance.post(`/counter-offer/${counterId}/decline`);
    return response.data;
}