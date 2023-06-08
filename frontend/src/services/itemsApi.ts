import {Item, ItemCreateBody, ItemUpdateBody} from "../models";
import axiosInstance from "./base";

export const getUserItems = async (): Promise<Array<Item>> => {
    const response = await axiosInstance.get("/items/logged-user", {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const getItemById = async (itemId: string): Promise<Item> => {
    const response = await axiosInstance.get(`/items/${itemId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const deleteItemById = async (itemId: string):Promise<void> => {
    const response = await axiosInstance.delete(`/items/${itemId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const createItem = async (item: ItemCreateBody): Promise<void> => {
    console.log(item)
    const response = await axiosInstance.post("/items", item, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    });
    return response.data.data;
}

export const updateItem = async (itemId: string, item: ItemUpdateBody): Promise<void> => {
    const response = await axiosInstance.post(`/items/${itemId}`, item, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.data;
}