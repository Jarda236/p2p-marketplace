import axiosInstance from "./base";
import {CounterOffer, CounterOfferCreateBody} from "../models";

const COUNTERS: CounterOffer[] = [
    {
        id: "1",
        offerId: "1",
        buyerId: "2",
        price: 43,
        status: null,
        itemsId: [
            "2"
        ]
    }
]

export const getCounterOfferById = /*TODO async*/ (counterId: string):/* Promise*/CounterOffer => {
    return COUNTERS.find(c => c.id === counterId) ??
        {
            id: "1",
            offerId: "1",
            buyerId: "2",
            price: 43,
            status: null,
            itemsId: [
                "2"
            ]
        };
    /*const response = await axiosInstance.get(`/counter-offers/${offerId}`);
    return response.data*/
}

export const getCounterOffersByOfferId = /*TODO async*/ (offerId: string):/* Promise*/Array<CounterOffer> => {
    return COUNTERS.filter(c => c.offerId === offerId);
    /*const response = await axiosInstance.get(`/counter-offers/offer/${offerId}`);
    return response.data*/
}

export const createCounterOffer = async (counterOffer: CounterOfferCreateBody): Promise<void> => {
    return;

    const response = await axiosInstance.post("/counter-offers", counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export const acceptCounterOffer = async (counterId: string):Promise<void> => {
    return;
    const response = await axiosInstance.post(`/counter-offer/${counterId}/accept`);
    return response.data;
}

export const declineCounterOffer = async (counterId: string):Promise<void> => {
    return;
    const response = await axiosInstance.post(`/counter-offer/${counterId}/decline`);
    return response.data;
}