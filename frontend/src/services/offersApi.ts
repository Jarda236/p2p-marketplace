import axiosInstance from "./base";
import {Offer, OfferCreateBody} from "../models";

const OFFERS: Offer[] = [
    {
        id: "1",
        name: "name1",
        description: "description1",
        sellerId: "1",
        userName: "user1",
        createdAt: 0,
        endDate: 10,
        topOffer: 0,
        price: 400,
        sold: false,
        buyerId: null,
        soldFor: null
    },
    {
        id: "2",
        name: "name2",
        description: "description2",
        sellerId: "2",
        userName: "user2",
        createdAt: 0,
        endDate: 10,
        topOffer: 0,
        price: 700,
        sold: true,
        buyerId: "1",
        soldFor: 700
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
    return;

    const response = await axiosInstance.post("/offers", offer, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export const getOffersBySellerId = async (userId: string): Promise<Array<Offer>> => {
    return OFFERS.filter(offer => offer.sellerId === userId);

    const response = await axiosInstance.get(`/offers/user/seller/${userId}`);
    return response.data;
}

export const getOffersByBuyerId = async (userId: string): Promise<Array<Offer>> => {
    return OFFERS.filter(offer => offer.buyerId === userId && offer.sold);

    const response = await axiosInstance.get(`/offers/user/buyer/${userId}`);
    return response.data;
}