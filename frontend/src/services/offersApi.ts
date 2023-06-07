import axiosInstance from "./base";
import {Offer, OfferCreateBody, OfferUpdateBody} from "../models";

const OFFERS: Offer[] = [
    {
        id: "1",
        createdAt: 0,

        price: 400,

        itemId: "1",

        sellerId: "1",
        sellerName: "username1",

        buyerId: null,
        buyerName: null
    },
    {
        id: "2",
        createdAt: 0,

        price: 700,

        itemId: "2",

        sellerId: "2",
        sellerName: "username2",

        buyerId: "1",
        buyerName: "username1"
    },
    {
        id: "3",
        createdAt: 0,

        price: 1100,

        itemId: "2",

        sellerId: "2",
        sellerName: "username2",

        buyerId: null,
        buyerName: null
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

    const response = await axiosInstance.get(`/offers/seller/${userId}`);
    return response.data;
}

export const getOffersByBuyerId = async (userId: string): Promise<Array<Offer>> => {
    return OFFERS.filter(offer => offer.buyerId === userId && offer.sold);

    const response = await axiosInstance.get(`/offers/buyer/${userId}`);
    return response.data;
}

export const deleteOfferById = async (offerId: string): Promise<void> => {
    const response = await axiosInstance.delete(`/offers/${offerId}`);
    return response.data;
}

export const updateOffer = async (offerId: string, offer: OfferUpdateBody): Promise<void> => {
    const response = await axiosInstance.put(`/offers/${offerId}`, offer, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response.data;
}

export const offerBuy = async (offerId: string): Promise<void> => {
    const response = await axiosInstance.post(`/offers/${offerId}/buy`);
    return response.data;
}