import axiosInstance from "./base";
import {Item} from "../models";

const CATEGORIES: string[] = [
    "Cars",
    "Boats",
    "Planes"
]
export const getCategories = async (): Promise<Array<string>> => {
    //return CATEGORIES;

    const response = await axiosInstance.get('/categories');
    return response.data;
}