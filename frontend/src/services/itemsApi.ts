import {Item, ItemCreateBody, ItemUpdateBody} from "../models";
import axiosInstance from "./base";

/* Vrati iba userove itemy, nie vsetky*/
export const getUserItems = async (): Promise<Array<Item>> => {
    const response = await axiosInstance.get('/items/logged-user');
    return response.data.data;
}

export const getItemById = async (itemId: string): Promise<Item> => {
    const response = await axiosInstance.get('/items/${itemId}');
    return response.data.data;
}

export const deleteItemById = async (itemId: string):Promise<void> => {
    const response = await axiosInstance.delete('/items/${itemId}');
    return response.data.data;
}

export const createItem = async (item: ItemCreateBody): Promise<void> => {
    const response = await axiosInstance.post("/items", item);
    return response.data.data;
}

export const updateItem = async (item: ItemUpdateBody): Promise<void> => {
    const response = await axiosInstance.post("/items", item, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.data.data;
}