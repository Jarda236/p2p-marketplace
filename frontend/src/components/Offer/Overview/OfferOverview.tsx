import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {CategoriesApi, OffersApi, UsersApi} from "../../../services"
import {Category, Offer, User} from "../../../models";
import OfferOverviewItem from "./Item/OfferOverviewItem";

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

    const [searchValue, changeSearchValue] = useState<string>("");
    const [sortCriteria, changeSortCriteria] = useState<ColumnToSort[]>([]);
    const [priceRange, changePriceRange] = useState<{from: number, to: number}>({from: 0, to: 999999 });

    const {data: offers} = useQuery({
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
            .filter(offer => offer.price >= priceRange.from && offer.price <= priceRange.to)
            .filter(offer => categoriesFilterArray.findIndex(category => category.id === offer.category.id) === -1)
            .filter(offer => props?.offersBySellerId === undefined || offer.sellerId === props?.offersBySellerId)
            .filter(offer => props?.offersByBuyerId === undefined || offer.buyerId === props?.offersByBuyerId)
            .filter(offer => offer.name.toLowerCase().includes(searchValue.toLowerCase()) || offer.description.toLowerCase().includes(searchValue.toLowerCase()))
            .sort((a: Offer, b: Offer) => {
            for (let i = 0; i < sortCriteria.length; i++) {
                const el1 = a[sortCriteria[i].column];
                const el2 = b[sortCriteria[i].column];
                if (el1 === null || el2 === null) {
                    continue;
                }
                const compare = el1.toString().toLowerCase().localeCompare(el2.toString().toLowerCase()) * (sortCriteria[i].order ? -1 : 1);
                if (compare !== 0) {
                    return compare;
                }
            }
            return 0;
        })
    }

    const changeSortingDirection = (column: string) => {
        const wantedColumn = sortCriteria.findIndex(e => e.column === column);
        if (wantedColumn !== -1) {
            handleOrderChange(column, sortCriteria[wantedColumn].order)
        } else {
            changeSortCriteria([...sortCriteria, { column: column, order: true }]);
        }
    }

    const deleteSorting = (column: string) => {
        changeSortCriteria(p => p.filter(item => item.column !== column));
    }

    const handleOrderChange = (column: string, order: boolean) => {
        const updatedSortCriteria: ColumnToSort[] = sortCriteria.map(item => {
            if (item.column === column) {
                return {...item, order: !order};
            }
            return item;
        });

        changeSortCriteria(updatedSortCriteria);
    }

    const getFilterIndex = (column: string): string => {
        const index = sortCriteria.findIndex(o => o.column === column);
        if (index === -1) {
            return " OFF";
        }
        return sortCriteria[index].order ? " DESC" : " ASC";
    }

    const [sortList, showSortList] = useState<boolean>(false);
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

    const [categoryList, showCategoryList] = useState<boolean>(false);
    const [categoriesFilterArray, changeCategoriesFilterArray] = useState<Category[]>([]);
    const toggleCategory = (category: Category) => {
        const index = categoriesFilterArray.findIndex(c => c.id === category.id);
        if (index === -1) {
            changeCategoriesFilterArray([...categoriesFilterArray, category]);
        } else {
            changeCategoriesFilterArray(categoriesFilterArray.filter(c => c.id !== category.id));
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

    const [priceRangeComponent, showPriceRangeComponent] = useState<boolean>(false);
    const priceComponent = <div style={{
        display: "inline",
        position: "absolute",
        background: "whitesmoke"
    }}>
        <input type="number" placeholder="From" value={priceRange.from} onChange={(e) => changePriceRange({to: priceRange.to, from: Number(e.target.value) })}/>
        <input type="number" placeholder="To" value={priceRange.to} onChange={(e) => changePriceRange({from: priceRange.from, to: Number(e.target.value) })}/>
    </div>

    const filteredOffers: Offer[] = filterOffers();
    return <div style={{position: "relative"}}>
        <h2>Offers Overview</h2>
        <NavLink to="/offers/create">Create offer</NavLink>
        <button type="button" onClick={() => {
            showSortList(!sortList);
            showCategoryList(false);
            showPriceRangeComponent(false);
        }}>Sort by</button>
        {sortList && filterComponent}
        <button type="button" onClick={() => {
            showCategoryList(!categoryList);
            showSortList(false);
            showPriceRangeComponent(false);
        }}>Category</button>
        {categoryList && categoryComponent}
        <button type="button" onClick={() => {
            showCategoryList(false);
            showSortList(false);
            showPriceRangeComponent(!priceRangeComponent);
        }}>Price</button>
        {priceRangeComponent && priceComponent}
        <div>
            <input
                type="search"
                value={searchValue}
                onChange={(e) => changeSearchValue(e.target.value)}
                placeholder="Search"
            />
            {<p>Ordered by: {sortCriteria.map(item => <span key={item.column}
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
        <div>
            <h5>Offers:</h5>
            <hr/>
            <ul>
                {offers ?
                    offers.map(offer =>
                    <OfferOverviewItem offer={offer} seller={getSeller(offer.sellerId)} />):
                    <span>Loading...</span>}
            </ul>
        </div>
        <NavLink to="/">Home</NavLink>
    </div>
}

export default OfferOverview;