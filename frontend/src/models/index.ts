export interface User {
    id: string;
    username: string;
    email: string;
    phone: number;
    city: string;
    createdAt: number;
    account: Account

    rating: number;
    image: string;
}

export interface Account {
    balance: number;
    balanceBlocked: number;
}

export interface Offer {
    id: string;
    createdAt: number;

    price: number;

    itemId: string;

    sellerId: string;
    sellerName: string;

    buyerId: string | null;
    buyerName: string | null;

    [key: string]: string | number | boolean | null;
}

export interface OfferCreateBody {
    price: number;
    itemId: string;
}

export interface Item {
    id: string;
    userId: string;

    name: string;
    description: string;
    category: string;
    image: string;

    [key: string]: string;
}

export interface ItemCreateBody {
    name: string;
    description: string;
    category: string;
    image: string;
}

export interface CounterOffer {
    id: string;
    offerId: string;
    buyerId: string;
    price: number;
    status: boolean | null;
    itemsId: Array<string>[]
}

export interface CounterOfferCreateBody {
    offerId: string;
    price: number;
    itemsId: Array<string>[]
}