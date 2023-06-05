import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {CategoriesApi, OffersApi, UsersApi} from "../../../services"
import {Category, Offer, User} from "../../../models";
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
    const [categoriesToFilter, changeCategoriesToFilter] = useState<Category[]>([]);
    const [showSortFilter, toggleShowSortFilter] = useState<boolean>(false);
    const [showCategoryFilter, toggleShowCategoryFilter] = useState<boolean>(false);
    const [showPriceFilter, toggleShowPriceFilter] = useState<boolean>(false);

    const {data: offers, refetch} = useQuery({
        queryKey: ['offers'],
        queryFn: () => OffersApi.getOffers()
    })

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
        if (offers === undefined) {
            return [];
        }
        return offers
            .filter(offer => offer.price >= priceToFilter.from && offer.price <= priceToFilter.to)
            .filter(offer => categoriesToFilter.findIndex(category => category.id === offer.category.id) === -1)
            .filter(offer => props?.offersBySellerId === undefined || offer.sellerId === props?.offersBySellerId)
            .filter(offer => props?.offersByBuyerId === undefined || offer.buyerId === props?.offersByBuyerId)
            .filter(offer => offer.name.toLowerCase().includes(valueToFilter.toLowerCase()) || offer.description.toLowerCase().includes(valueToFilter.toLowerCase()))
            .sort((a: Offer, b: Offer) => {
            for (let i = 0; i < columnsToSort.length; i++) {
                const el1 = a[columnsToSort[i].column];
                const el2 = b[columnsToSort[i].column];
                if (el1 === null || el2 === null) {
                    continue;
                }
                const compare = el1.toString().toLowerCase().localeCompare(el2.toString().toLowerCase()) * (columnsToSort[i].order ? -1 : 1);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        })
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

    const COLUMNS = [{name: "name", display: "Name"}, {name: "sellerName", display: "Seller"}, {name: "createdAt", display: "Created at"}, {name: "topOffer", display: "Top offer"}, {name: "price", display: "Price"}, {name: "sold", display: "Sold"}];
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


    const toggleCategory = (category: Category) => {
        const index = categoriesToFilter.findIndex(c => c.id === category.id);
        if (index === -1) {
            changeCategoriesToFilter([...categoriesToFilter, category]);
        } else {
            changeCategoriesToFilter(categoriesToFilter.filter(c => c.id !== category.id));
        }
    }
    const categoryComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <ul>
            {categories ? categories.map(category => <li key={category.id}>
                <p onClick={() => toggleCategory(category)}>{category.name}</p>
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
            <table>
                <thead>
                <tr>
                    <td>
                        Offers:
                    </td>
                </tr>
                </thead>
                <tbody>
                {filteredOffers?.map(offer =>
                    <tr key={offer.id} onClick={() => handleClick(offer.id)}>
                        <td>{offer.name}</td>
                        <td>{offer.category.name}</td>
                        <td>{offer.sellerName}</td>
                        <td>{offer.createdAt}</td>
                        <td>{offer.topOffer}</td>
                        <td>{offer.price}</td>
                        <td>{offer.sold ? "SOLD" : "OPEN"}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <hr/>
        <hr/>
        <div>
            <h5>Offers:</h5>
            <hr/>
            <ul>
                {offers ?
                    filterOffers().map(offer =>
                    <OfferOverviewItem offer={offer} seller={getSeller(offer.sellerId)} />):
                    <span>Loading...</span>}
            </ul>
        </div>
    </div>
}

export default OfferOverview;