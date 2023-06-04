import {number, string} from "yup";

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
    [key: string]: string | number | boolean;
}

export interface OfferCreateBody {
    name: string;
    description: string;
    endDate: Date;
    startingBid?: number;
    instantBuyAmount?: number;
}