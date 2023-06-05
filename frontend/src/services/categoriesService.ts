import {Category} from "../models";
import axiosInstance from "./base";

const CATEGORIES: Category[] = [
    {
        id: "1",
        name: "Cars"
    },
    {
        id: "2",
        name: "Boats"
    }
]
export const getCategories = async (): Promise<Array<Category>> => {
    return CATEGORIES;

    const response = await axiosInstance.get('/categories');
    return response.data;
}