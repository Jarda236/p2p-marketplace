import {Category, Item, ItemCreateBody} from "../models";
import axiosInstance from "./base";

const ITEMS: Item[] = [

]
export const getItems = async (): Promise<Array<Item>> => {
    return ITEMS;

    /*const response = await axiosInstance.get('/items');
    return response.data;*/
}