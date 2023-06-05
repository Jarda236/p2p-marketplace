import React, {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {OffersApi} from "../../../services"
import {Offer} from "../../../models";

interface ColumnToSort {
    column: string;
    // true = descending
    order: boolean;
}

interface Props {
    offersByUserId?: string
}
const OfferOverview: FC<Props> = (props) => {
    const navigate = useNavigate();

    const [searchValue, changeSearchValue] = useState<string>("");

    const [sortCriteria, changeSortCriteria] = useState<ColumnToSort[]>([]);

    const {data: offers} = useQuery({
        queryKey: ['offers'],
        queryFn: () => props?.offersByUserId === undefined ? OffersApi.getOffers() : OffersApi.getOffersBySellerId(props.offersByUserId)
    })

    const handleClick = (offerId: string) => {
        navigate("/offers/".concat(offerId))
    }

    const filterOffers = (): Array<Offer> => {
        if (offers === undefined) {
            return [];
        }
        return offers.filter(offer => offer.name.toLowerCase().includes(searchValue.toLowerCase()) || offer.description.toLowerCase().includes(searchValue.toLowerCase())).sort((a: Offer, b: Offer) => {
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
                return { ...item, order: !order };
            }
            return item;
        });

        changeSortCriteria(updatedSortCriteria);
    }

    const filteredOffers: Offer[] = filterOffers();

    return <>
        <h2>Offers Overview</h2>
        <div>
            <input
                type="search"
                value={searchValue}
                onChange={(e) => changeSearchValue(e.target.value)}
                placeholder="Search"
            />
            {<p>Ordered by: {sortCriteria.map(item => <span key={item.column}
                onDoubleClick={() => deleteSorting(item.column)}>{item.column.concat(" ".concat(item.order ? "d " : "a "))}</span>)}</p>}
            <table>
                <thead>
                    <tr>
                        <th onClick={() => changeSortingDirection("name")}>Name</th>
                        <th onClick={() => changeSortingDirection("userName")}>Created by</th>
                        <th onClick={() => changeSortingDirection("createdAt")}>Created at</th>
                        <th onClick={() => changeSortingDirection("topOffer")}>Top offer</th>
                        <th onClick={() => changeSortingDirection("instantBuyAmount")}>Price</th>
                        <th onClick={() => changeSortingDirection("sold")}>Status</th>
                    </tr>

                </thead>
                <tbody>
                {filteredOffers?.map(offer =>
                        <tr key={offer.id} onClick={() => handleClick(offer.id)}>
                            <td>{offer.name}</td>
                            <td>{offer.userName}</td>
                            <td>{offer.createdAt}</td>
                            <td>{offer.topOffer}</td>
                            <td>{offer.price}</td>
                            <td>{offer.sold ? "SOLD" : "OPEN"}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
        <NavLink to="/">Home</NavLink>
    </>
}

export default OfferOverview;