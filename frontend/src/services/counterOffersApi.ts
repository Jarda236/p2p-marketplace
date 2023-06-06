import axiosInstance from "./base";
import {CounterOffer, CounterOfferCreateBody, OfferCreateBody} from "../models";

export const createCounterOffer = async (counterOffer: CounterOfferCreateBody): Promise<void> => {
    return;

    const response = await axiosInstance.post("/counter-offers", counterOffer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}