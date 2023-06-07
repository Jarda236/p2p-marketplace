import {Item, ItemCreateBody, ItemUpdateBody} from "../models";
import axiosInstance from "./base";

const ITEMS: Item[] = [
    {
        id: "1",
        userId: "1",

        name: "itemname1",
        description: "item decription1  Lorem ipsum is a placeholder text commonly used in the graphic design industry as a dummy text for creating working examples of graphic designs such as websites, magazine layouts, and all kinds of advertising materials.",
        category: "Cars",
        image: "/pictures/auto.jpg",
        blocked: false,
        deleted: false
    },
    {
        id: "2",
        userId: "2",

        name: "itemname2",
        description: "item decription2",
        category: "Boats",
        image: "/pictures/auto.jpg",
        blocked: false,
        deleted: false
    }
]
/* Vrati iba userove itemy, nie vsetky*/
export const getItems = async (): Promise<Array<Item>> => {
    return ITEMS;

    /*const response = await axiosInstance.get('/items');
    return response.data;*/
}

export const getItemById = async (itemId: string): Promise<Item> => {
    return ITEMS.find(item => item.id === itemId) ?? {
        id: "1",
        userId: "1",

        name: "itemname1",
        description: "item decription1",
        category: "Car",
        image: "/pictures/auto.jpg",
        blocked: false,
        deleted: false
    };

    /*const response = await axiosInstance.get('/items/${itemId}');
    return response.data;*/
}

export const deleteItemById = async (itemId: string):Promise<void> => {
    return;

    /*const response = await axiosInstance.delete('/items/${itemId}');
    return response.data;*/
}

export const createItem = async (item: ItemCreateBody): Promise<void> => {
    const response = await axiosInstance.post("/items", item, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export const updateItem = async (item: ItemUpdateBody): Promise<void> => {
    const response = await axiosInstance.post("/items", item, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data;
}