import React, {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CategoriesApi, ItemsApi, OffersApi, UsersApi} from "../../../services"
import {Offer, User} from "../../../models";
import OfferOverviewItem from "./Item/OfferOverviewItem";
import {filterOffers, getItemByIdFromQuery} from "../../../utils/filtering";
import PriceFilter from "./Filters/PriceFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import SortFilter from "./Filters/SortFilter";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

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

    const {data: users} = useQuery({
        queryKey: ['users'],
        queryFn: () => UsersApi.getUsers()
    })

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
        <div>
        <div className=" h-auto bg-gray-300 rounded-lg mx-2 sm:mx-6 my-4 shadow-lg shadow-gray-300 relative">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex flex-col sm:flex-row font-medium mt-0 space-y-2 sm:space-x-2 sm:space-y-0 text-sm whitespace-nowrap sm:items-center">
                    <div> 
                        <NavLink to="/offers/create"
                        className="p-2 text-black hover:bg-yellow-400 bg-yellow-300 rounded-lg">
                            Create offer
                        </NavLink>
                    </div>

                    <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={() => toggleFilterComponents(FilterComponents.Sort)}
                        className="text-black hover:underline">
                        Sort by ᐯ
                    </button>
                    {showSortFilter && <SortFilter
                        columnsToSort={columnsToSort}
                        changeColumnsToSort={changeColumnsToSort} />
                    }
                    </div>

                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={() => toggleFilterComponents(FilterComponents.Category)}
                            className="text-black hover:underline">
                            Category ᐯ
                        </button>
                        {showCategoryFilter && <CategoryFilter
                            toggleCategory={toggleCategory}
                            categories={categories}
                            selectedCategories={categoriesToFilter}/>
                        }
                    </div>

                    <div>
                    <PriceFilter
                        priceToFilter={priceToFilter}
                        changePriceToFilter={changePriceToFilter} />
                    </div>

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

                    <div>
                    <button type="button" onClick={() => refetch()}
                    className="text-black hover:underline">Refresh</button>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <section>
                <ul>
                    {(offers && users) ?
                        filteredOffers.map((offer) =>
                        <OfferOverviewItem key={offer.id} offer={offer} seller={users?.find(u => u.id === offer.userId) ?? users[0]} item={getItemByIdFromQuery(items,  offer.itemId)}/>):
                        <span>Loading...</span>}
                </ul>
            </section>
        </div>
        </div>
    );
}

export default OfferOverview;