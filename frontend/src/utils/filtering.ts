import {Item, Offer} from "../models";
import {UseQueryResult} from "@tanstack/react-query";

interface PriceFilter {
    from: number;
    to: number;
}

interface InputParameters {
    offers?: Array<Offer>,
    items?: Array<Item | undefined>,
    priceToFilter?: PriceFilter,
    categoriesToFilter?: Array<string>,
    sellerId?: string,
    buyerId?: string,
    searchValue?: string,
    columnsToSort?: Array<ColumnToSort>
}

interface ColumnToSort {
    column: string;
    // true = descending
    order: boolean;
}

export const filterOffers = ({offers, items, priceToFilter = {from: 0, to: 9999999}, categoriesToFilter = [], sellerId, buyerId, searchValue = "", columnsToSort = []}: InputParameters): Array<Offer> => {
    if (offers === undefined || items === undefined) {
        return [];
    }
    return offers
        .filter(offer => offer.price >= priceToFilter.from && offer.price <= priceToFilter.to)
        .filter((offer, index) => {
            if (categoriesToFilter.length === 0){
                return true
            }
            return categoriesToFilter.findIndex(category => category === items[index]?.category) !== -1
        })
        .filter(offer => sellerId === undefined || offer.sellerId === sellerId)
        .filter(offer => buyerId === undefined || offer.buyerId === buyerId)
        .filter((offer, index) => {
            if (items[index] === undefined) {
                return true;
            }
            return items[index]?.name.toLowerCase().includes(searchValue.toLowerCase()) || items[index]?.description.toLowerCase().includes(searchValue.toLowerCase());
        })
        .sort((a: Offer, b: Offer) => {
            for (let i = 0; i < columnsToSort.length; i++) {
                const el1 = a[columnsToSort[i].column];
                const el2 = b[columnsToSort[i].column];
                const item1 = getItemById(items, a.itemId);
                const item2 = getItemById(items, b.itemId);
                let el3: string = ""
                let el4 : string= "";
                if (item1 !== undefined && item2 !== undefined && item1[columnsToSort[i].column] !== undefined && item2[columnsToSort[i].column] !== undefined){
                    if (item1[columnsToSort[i].column] === true) {
                        el3 = "1";
                    }
                    if (item1[columnsToSort[i].column] === false) {
                        el3 = "0";
                    }
                    if (item2[columnsToSort[i].column] === true) {
                        el4 = "1";
                    }
                    if (item2[columnsToSort[i].column] === false) {
                        el4 = "0";
                    }
                    el3 = item1[columnsToSort[i].column].toString();
                    el4 = item2[columnsToSort[i].column].toString();
                }
                if (el1 !== undefined && el2 !== undefined) {
                    if (columnsToSort[i].column === "buyerId") {
                        if (el1 === null){
                            if (el2 === null) {
                                continue;
                            }
                            return -1 * (columnsToSort[i].order ? -1 : 1);
                        }
                        if (el2 === null) {
                            return 1 * (columnsToSort[i].order ? -1 : 1);
                        }
                        continue;
                    }
                    if (columnsToSort[i].column === "price") {
                        return (Number(el1) - Number(el2)) * (columnsToSort[i].order ? -1 : 1);
                    }
                    const compare = (el1 ? el1 : "").toString().toLowerCase().localeCompare((el2 ? el2 : "").toString().toLowerCase()) * (columnsToSort[i].order ? -1 : 1);
                    if (compare !== 0) {
                        return compare;
                    }
                    continue;
                }
                const compare = el3.toString().toLowerCase().localeCompare(el4.toString().toLowerCase()) * (columnsToSort[i].order ? -1 : 1);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        })
}

const getItemById = (items: Array<Item | undefined>, itemId: string): Item | undefined => {
    return items.find(item => item?.id === itemId);
}

export const getItemByIdFromQuery = (items: UseQueryResult<Item>[], itemId: string): Item | undefined => {
    return items.find(item => item.data?.id === itemId)?.data;
}