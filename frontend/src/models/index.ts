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
    startingBid: number;
    topBid: number;
    instantBuyAmount: number;
    sold: boolean;
}