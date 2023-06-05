export interface User {
    id: string;
    name: string;
    username: string;
    createdAt: number;
    cashAmount: number;
}

export interface Offer {
    id: string;
    name: string;
    description: string;
    sellerId: string;
    userName: string;
    createdAt: number;
    endDate: number;
    topOffer: number;
    price: number;
    sold: boolean;
    buyerId: string | null;
    soldFor: number | null;
    [key: string]: string | number | boolean | null;
}

export interface PriceOffer {
    id: string;
    offerId: string;
    buyerId: string;
    sellerId: string;
    price: number;
}

export interface OfferCreateBody {
    name: string;
    description: string;
    endDate: Date;
    startingBid?: number;
    instantBuyAmount?: number;
}

export interface FromState {
    offersByUserId: string
}