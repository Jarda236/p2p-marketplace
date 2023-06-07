import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CategoriesApi, ItemsApi, OffersApi, UsersApi} from "../../../services"
import {Offer} from "../../../models";
import OfferOverviewItem from "./Item/OfferOverviewItem";
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

    const {data: offers, refetch} = useQuery({
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

    const toggleCategory = (category: string) => {
        const index = categoriesToFilter.findIndex(c => c === category);
        if (index === -1) {
            changeCategoriesToFilter([...categoriesToFilter, category]);
        } else {
            changeCategoriesToFilter(categoriesToFilter.filter(c => c !== category));
        }
        return true;
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

    return( 
        <>
        <nav className="bg-gray-300 rounded-lg mx-6 my-4 shadow-lg shadow-gray-300">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                    <li>
                        <NavLink to="/offers/create"
                        className="text-black hover:bg-yellow-400 bg-yellow-300 py-1.5 px-1.5 rounded-lg">
                            Create offer
                        </NavLink>
                    </li>

                    <li>
                    <button
                        type="button"
                        onClick={() => toggleFilterComponents(FilterComponents.Sort)}
                        className="text-black hover:underline">
                        Sort by
                    </button>
                    {showSortFilter && <SortFilter
                        columnsToSort={columnsToSort}
                        changeColumnsToSort={changeColumnsToSort} />
                    }
                    </li>
                    <li>
                    <button
                        type="button"
                        onClick={() => toggleFilterComponents(FilterComponents.Category)}
                        className="text-black hover:underline">
                        Category
                    </button>
                    {showCategoryFilter && <CategoryFilter
                        toggleCategory={toggleCategory}
                        categories={categories} />
                    }
                    </li>

                    <li>
                    <PriceFilter
                        priceToFilter={priceToFilter}
                        changePriceToFilter={changePriceToFilter} />
                    </li>

                    <li>
                    <div>
                        <input
                            id="search-field"
                            type="search"
                            value={searchValue}
                            onChange={(e) => changeSearchValue(e.target.value)}
                            placeholder="Search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-1"
                        />
                    </div>
                    </li>

                    <li>
                    <button type="button" onClick={() => refetch()}
                    className="text-black hover:underline">Refresh</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

        <div>
            <section>
                <ul>
                    {offers ?
                        filteredOffers.map((offer) =>
                        <OfferOverviewItem key={offer.id} offer={offer} seller={getSeller(offer.sellerId)} item={getItemByIdFromQuery(items, offer.itemId)}/>):
                        <span>Loading...</span>}
                </ul>
            </section>
        </div>
        </>
    );
}

export default OfferOverview;