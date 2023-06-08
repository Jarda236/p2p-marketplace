export interface User {
    id: string;
    name: string;
    email: string;
    phone: number;
    city: string;
    createdAt: number;
    fundsAccount: Account

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

    userId: string;
    userName: string;

    buyerId: string | null;
    buyerName: string | null;

    [key: string]: string | number | boolean | null;
}

export interface OfferCreateBody {
    price: number;
    itemId: string;
}

export interface OfferUpdateBody {
    price?: number;
    itemId?: string;
}

export interface Item {
    id: string;
    userId: string;

    name: string;
    description: string;
    category: string;
    image: string;

    blocked: boolean;
    deleted: boolean;

    [key: string]: string | boolean;
}

export interface ItemCreateBody {
    userId: string;
    name: string;
    description: string;
    category: string;
    image: string;
    blocked: boolean;
}

export interface ItemUpdateBody {
    userId: string;
    name: string;
    description: string;
    category: string;
    image: string;
    blocked: boolean;
}

export interface CounterOffer {
    id: string;
    offerId: string;
    buyerId: string;
    price: number;
    status: boolean | null;
    itemsId: Array<string>
}

export interface CounterOfferCreateBody {
    offerId: string;
    price: number;
    itemsId: Array<string>
}

export interface CounterOfferUpdateBody {
    price: number;
    itemsId: Array<string>
}