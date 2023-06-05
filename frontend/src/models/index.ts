export interface User {
    id: string;
    name: string;
    username: string;
    createdAt: number;
    cashAmount: number;
}

export interface Offer {
    id: string;
    name: string,
    description: string,
    userId: string;
    userName: string;
    createdAt: number;
    endDate: number,
    startingBid: number;
    topBid: number;
    instantBuyAmount: number;
    sold: boolean;
    buyerId: string;
    soldFor: number;
    [key: string]: string | number | boolean;
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