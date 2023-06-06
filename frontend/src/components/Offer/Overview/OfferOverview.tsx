import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CategoriesApi, ItemsApi, OffersApi, UsersApi} from "../../../services"
import {Item, Offer} from "../../../models";
import OfferOverviewItem from "./Item/OfferOverviewItem";
import {RecoilLoadable} from "recoil";
import of = RecoilLoadable.of;

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
    const navigate = useNavigate();

    const [valueToFilter, changeValueToFilter] = useState<string>("");
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

    const handleClick = (offerId: string) => {
        navigate("/offers/".concat(offerId))
    }

    const filterOffers = (): Array<Offer> => {
        if (offers === undefined || items === undefined) {
            return [];
        }
        return offers
            .filter(offer => offer.price >= priceToFilter.from && offer.price <= priceToFilter.to)
            .filter((offer, index) => {
                return categoriesToFilter.findIndex(category => category === items[index].data?.category) === -1
            })
            .filter(offer => props?.offersBySellerId === undefined || offer.sellerId === props?.offersBySellerId)
            .filter(offer => props?.offersByBuyerId === undefined || offer.buyerId === props?.offersByBuyerId)
            .filter((offer, index) => {
                if (items[index].data === undefined) {
                    return true;
                }
                return items[index].data?.name.toLowerCase().includes(valueToFilter.toLowerCase()) || items[index].data?.description.toLowerCase().includes(valueToFilter.toLowerCase());
            })
            .sort((a: Offer, b: Offer) => {
            for (let i = 0; i < columnsToSort.length; i++) {
                const el1 = a[columnsToSort[i].column];
                const el2 = b[columnsToSort[i].column];
                const item1 = getItemById(a.itemId);
                const item2 = getItemById(b.itemId);
                let el3 = ""
                let el4 = "";
                if (item1 !== undefined && item2 !== undefined){
                    el3 = item1[columnsToSort[i].column];
                    el4 = item2[columnsToSort[i].column];
                }
                console.log(el1, el2)
                if (el1 !== null && el2 !== null && el1 !== undefined && el2 !== undefined) {
                    const compare = el1.toString().toLowerCase().localeCompare(el2.toString().toLowerCase()) * (columnsToSort[i].order ? -1 : 1);
                    if (compare !== 0) {
                        return compare;
                    }
                    return 0;
                }
                const compare = el3.toString().toLowerCase().localeCompare(el4.toString().toLowerCase()) * (columnsToSort[i].order ? -1 : 1);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        })
    }

    const getItemById = (itemId: string): Item | undefined => {
        return items.find(item => item.data?.id === itemId)?.data;
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

    const COLUMNS = [{name: "name", display: "Name"}, {name: "sellerName", display: "Seller"}, {name: "createdAt", display: "Created at"}, {name: "price", display: "Price"}, {name: "sold", display: "Sold"}];
    const filterComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {COLUMNS.map(item => <li key={item.name}>
                <p onClick={() => changeSortingDirection(item.name)}>{item.display}{getFilterIndex(item.name)}</p>
            </li>)}
        </ul>
    </div>


    const toggleCategory = (category: string) => {
        const index = categoriesToFilter.findIndex(c => c === category);
        if (index === -1) {
            changeCategoriesToFilter([...categoriesToFilter, category]);
        } else {
            changeCategoriesToFilter(categoriesToFilter.filter(c => c !== category));
        }
    }
    const categoryComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {categories ? categories.map(category => <li key={category}>
                <p onClick={() => toggleCategory(category)}>{category}</p>
            </li>) : "Loading..."}
        </ul>
    </div>


    const priceComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <input type="number" placeholder="From" value={priceToFilter.from} onChange={(e) => changePriceToFilter({to: priceToFilter.to, from: Number(e.target.value) })}/>
        <input type="number" placeholder="To" value={priceToFilter.to} onChange={(e) => changePriceToFilter({from: priceToFilter.from, to: Number(e.target.value) })}/>
    </div>

    const filteredOffers: Offer[] = filterOffers();
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
        {showCategoryFilter && categoryComponent}
        <button type="button" onClick={() => {
            toggleShowCategoryFilter(false);
            toggleShowSortFilter(false);
            toggleShowPriceFilter(!showPriceFilter);
        }}>Price</button>
        {showPriceFilter && priceComponent}
        <div>
            <input
                type="search"
                value={valueToFilter}
                onChange={(e) => changeValueToFilter(e.target.value)}
                placeholder="Search"
            />
            {<p>Ordered by: {columnsToSort.map(item => <span key={item.column}
                                                            onDoubleClick={() => deleteSorting(item.column)}>{item.column.concat(" ")}</span>)}</p>}
        </div>
        <hr/>
        <hr/>
        <section>
            <h5>Offers:</h5>
            <hr/>
            <ul>
                {offers ?
                    filteredOffers.map((offer, index) =>
                    <OfferOverviewItem key={offer.id} offer={offer} seller={getSeller(offer.sellerId)} item={items[index].data}/>):
                    <span>Loading...</span>}
            </ul>
        </section>
    </div>
}

export default OfferOverview;