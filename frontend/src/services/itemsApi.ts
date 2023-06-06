import {Item, ItemCreateBody} from "../models";
import axiosInstance from "./base";

const ITEMS: Item[] = [
    {
        id: "1",
        userId: "1",

        name: "itemname1",
        description: "item decription1",
        category: "Cars",
        image: "/pictures/auto.jpg",
    },
    {
        id: "2",
        userId: "2",

        name: "itemname2",
        description: "item decription2",
        category: "Boats",
        image: "/pictures/auto.jpg",
    }
]
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
    };

    /*const response = await axiosInstance.get('/items');
    return response.data;*/
}