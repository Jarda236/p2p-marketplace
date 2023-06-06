export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    city: string;
    createdAt: number;

    balance: number;
    balanceBlocked: number;

    rating: number;
    image: string;
}

export interface Offer {
    id: string;
    createdAt: number;

    price: number;
    sold: boolean;

    itemId: string;

    sellerId: string;
    sellerName: string;

    buyerId: string | null;
    buyerName: string | null;

    [key: string]: string | number | boolean | null | Category;
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
    categoryId: string;
    image: string;

    offerId: string | null;
    counterOfferId: string | null;
}

export interface ItemCreateBody {
    name: string;
    description: string;
    categoryId: string;
    image: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface CounterOffer {
    id: string;
    offerId: string;
    price: number;
    itemsId: Array<string>[]
}

export interface CounterOfferCreateBody {
    offerId: string;
    price: number;
    itemsId: Array<string>[]
}