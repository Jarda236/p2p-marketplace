import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {CategoriesApi, OffersApi} from "../../../services"
import {Category, Offer} from "../../../models";

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

    const {data: offers} = useQuery({
        queryKey: ['offers'],
        queryFn: () => OffersApi.getOffers()
    })

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoriesApi.getCategories()
    })

    const handleClick = (offerId: string) => {
        navigate("/offers/".concat(offerId))
    }

    const filterOffers = (): Array<Offer> => {
        if (offers === undefined) {
            return [];
        }
        return offers
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

    const filteredOffers: Offer[] = filterOffers();
    return <div style={{position: "relative"}}>
        <h2>Offers Overview</h2>
        <NavLink to="/offers/create">Create offer</NavLink>
        <button type="button" onClick={() => {
            showSortList(!sortList);
            showCategoryList(false);
        }}>Sort by</button>
        {sortList && filterComponent}
        <button type="button" onClick={() => {
            showCategoryList(!categoryList);
            showSortList(false);
        }}>Category</button>
        {categoryList && categoryComponent}
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
        <NavLink to="/">Home</NavLink>
    </div>
}

export default OfferOverview;