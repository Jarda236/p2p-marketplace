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
import SortFilter from "./Filters/SortFilter";

interface ColumnToSort {
    column: string;
    // true = descending
    order: boolean;
}

interface Props {
    offersBySellerId?: string,
    offersByBuyerId?: string
}

enum FilterComponents {
    Sort,
    Category,
    Price
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

    const toggleFilterComponents = (component: FilterComponents) => {
        switch (component) {
            case FilterComponents.Category: {
                toggleShowCategoryFilter(!showCategoryFilter);
                toggleShowSortFilter(false);
                toggleShowPriceFilter(false);
                break;
            }
            case FilterComponents.Price: {
                toggleShowCategoryFilter(false);
                toggleShowSortFilter(false);
                toggleShowPriceFilter(!showPriceFilter);
                break;
            }
            case FilterComponents.Sort: {
                toggleShowCategoryFilter(false);
                toggleShowSortFilter(!showSortFilter);
                toggleShowPriceFilter(false);
            }
        }
    }

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
        <button type="button" onClick={() => toggleFilterComponents(FilterComponents.Sort)}>Sort by</button>
        {showSortFilter && <SortFilter columnsToSort={columnsToSort} changeColumnsToSort={changeColumnsToSort} />}

        <button type="button" onClick={() => toggleFilterComponents(FilterComponents.Category)}>Category</button>
        {showCategoryFilter && <CategoryFilter categoriesToFilter={categoriesToFilter} changeCategoriesToFilter={changeCategoriesToFilter} categories={categories} />}

        <button type="button" onClick={() => {toggleFilterComponents(FilterComponents.Price)}}>Price</button>
        {showPriceFilter && <PriceFilter priceToFilter={priceToFilter} changePriceToFilter={changePriceToFilter} />}

        <div>
            <input
                id="search-field"
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