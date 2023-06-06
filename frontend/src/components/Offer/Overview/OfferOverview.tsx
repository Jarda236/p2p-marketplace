import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CategoriesApi, ItemsApi, OffersApi, UsersApi} from "../../../services"
import {Item, Offer} from "../../../models";
import OfferOverviewItem from "./Item/OfferOverviewItem";
import {RecoilLoadable} from "recoil";
import of = RecoilLoadable.of;
import {filterOffers, getItemByIdFromQuery} from "../../../utils/filtering";
import PriceFilter from "./Filters/PriceFilter";
import CategoryFilter from "./Filters/CategoryFilter";

interface ColumnToSort {
    column: string;
    // true = descending
    order: boolean;
}

interface Props {
    offersBySellerId?: string,
    offersByBuyerId?: string
}

const OfferOverview: FC<Props> = (props) => {
    const [searchValue, changeSearchValue] = useState<string>("");
    const [columnsToSort, changeColumnsToSort] = useState<ColumnToSort[]>([]);
    const [priceToFilter, changePriceToFilter] = useState<{from: number, to: number}>({from: 0, to: 999999 });
    const [categoriesToFilter, changeCategoriesToFilter] = useState<string[]>([]);
    const [showSortFilter, toggleShowSortFilter] = useState<boolean>(false);
    const [showCategoryFilter, toggleShowCategoryFilter] = useState<boolean>(false);
    const [showPriceFilter, toggleShowPriceFilter] = useState<boolean>(false);

    const {data: offers} = useQuery({
        queryKey: ['offers'],
        queryFn: () => OffersApi.getOffers()
    })

    const items = useQueries({
        queries: offers?.map((offer) => {
            return {
                queryKey: ["item", offer.itemId],
                queryFn: () => ItemsApi.getItemById(offer.itemId),
            };
        }) || [],
    });

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoriesApi.getCategories()
    })

    const getSeller = /*async*/ (sellerId: string) => {
        return /*await*/ UsersApi.getUserById(sellerId);
    }
    const changeSortingDirection = (column: string) => {
        const wantedColumn = columnsToSort.findIndex(e => e.column === column);
        if (wantedColumn !== -1) {
            handleOrderChange(column, columnsToSort[wantedColumn].order)
        } else {
            changeColumnsToSort([...columnsToSort, { column: column, order: true }]);
        }
    }

    const deleteSorting = (column: string) => {
        changeColumnsToSort(p => p.filter(item => item.column !== column));
    }

    const handleOrderChange = (column: string, order: boolean) => {
        const updatedSortCriteria: ColumnToSort[] = columnsToSort.map(item => {
            if (item.column === column) {
                return {...item, order: !order};
            }
            return item;
        });

        changeColumnsToSort(updatedSortCriteria);
    }

    const getFilterIndex = (column: string): string => {
        const index = columnsToSort.findIndex(o => o.column === column);
        if (index === -1) {
            return " OFF";
        }
        return columnsToSort[index].order ? " DESC" : " ASC";
    }

    const COLUMNS = [{name: "name", display: "Name"}, {name: "sellerName", display: "Seller"}, {name: "createdAt", display: "Created at"}, {name: "price", display: "Price"}, {name: "buyerId", display: "Sold"}];
    const filterComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {COLUMNS.map(item => <li key={item.name}>
                <span onClick={() => changeSortingDirection(item.name)}>{item.display}{getFilterIndex(item.name)} </span><span onClick={() => deleteSorting(item.name)}>X</span>
            </li>)}
        </ul>
    </div>

    const filteredOffers: Offer[] = filterOffers({
        offers: offers,
        items: items.map(item => item.data),
        priceToFilter: priceToFilter,
        categoriesToFilter: categoriesToFilter,
        sellerId: props?.offersBySellerId,
        buyerId: props?.offersByBuyerId,
        searchValue: searchValue,
        columnsToSort: columnsToSort
    });

    return <div style={{position: "relative"}}>
        <h2>Offers Overview</h2>
        <NavLink to="/offers/create">Create offer</NavLink>
        <button type="button" onClick={() => {
            toggleShowSortFilter(!showSortFilter);
            toggleShowCategoryFilter(false);
            toggleShowPriceFilter(false);
        }}>Sort by</button>
        {showSortFilter && filterComponent}
        <button type="button" onClick={() => {
            toggleShowCategoryFilter(!showCategoryFilter);
            toggleShowSortFilter(false);
            toggleShowPriceFilter(false);
        }}>Category</button>
        {showCategoryFilter && <CategoryFilter categoriesToFilter={categoriesToFilter} changeCategoriesToFilter={changeCategoriesToFilter} categories={categories} />}
        <button type="button" onClick={() => {
            toggleShowCategoryFilter(false);
            toggleShowSortFilter(false);
            toggleShowPriceFilter(!showPriceFilter);
        }}>Price</button>
        {showPriceFilter && <PriceFilter priceToFilter={priceToFilter} changePriceToFilter={changePriceToFilter} />}
        <div>
            <input
                type="search"
                value={searchValue}
                onChange={(e) => changeSearchValue(e.target.value)}
                placeholder="Search"
            />
        </div>
        <hr/>
        <section>
            <h5>Offers:</h5>
            <hr/>
            <ul>
                {offers ?
                    filteredOffers.map((offer) =>
                    <OfferOverviewItem key={offer.id} offer={offer} seller={getSeller(offer.sellerId)} item={getItemByIdFromQuery(items, offer.itemId)}/>):
                    <span>Loading...</span>}
            </ul>
        </section>
    </div>
}

export default OfferOverview;