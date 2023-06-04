import axiosInstance from "./base";
import {Offer, OfferCreateBody} from "../models";

const OFFERS: Offer[] = [
    {
        id: "1",
        name: "name1",
        description: "description1",
        userId: "1",
        userName: "user1",
        createdAt: 0,
        endDate: 10,
        startingBid: 50,
        topBid: 0,
        instantBuyAmount: 400,
        sold: false
    },
    {
        id: "2",
        name: "name2",
        description: "description2",
        userId: "1",
        userName: "user1",
        createdAt: 0,
        endDate: 10,
        startingBid: 60,
        topBid: 0,
        instantBuyAmount: 700,
        sold: false
    }
];

export const getOffers = async (): Promise<Array<Offer>> => {
    return OFFERS;

    const response = await axiosInstance.get('/offers');
    return response.data;
}

export const getOfferById = async (offerId: string): Promise<Offer | null> => {
    return OFFERS.find(offer => offer.id === offerId) ?? null;

    const response = await axiosInstance.get(`/offers/${offerId}`);
    return response.data;
}

export const createOffer = async (offer: OfferCreateBody): Promise<void> => {
    const newOffer: Offer = {
        id: (Number(OFFERS[OFFERS.length - 1].id)+1).toString(),
        name: offer.name,
        description: offer.description,
        userId: "1",
        userName: "user1",
        createdAt: Date.now(),
        endDate: offer.endDate.getMilliseconds(),
        startingBid: offer.startingBid ?? 0,
        topBid: 0,
        instantBuyAmount: offer.instantBuyAmount ?? 0,
        sold: false
    }
    return;

    const response = await axiosInstance.post("/offers", offer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}