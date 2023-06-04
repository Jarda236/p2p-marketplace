import axiosInstance from "./base";
import {Offer} from "../models";

const OFFERS = [
    {
        id: "1",
        name: "name1",
        description: "description1",
        userId: "1",
        userName: "user1",
        createdAt: 0,
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