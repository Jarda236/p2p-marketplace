import {FC} from "react";
import {NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {OffersApi} from "../../../services"

const OfferOverview: FC = () => {
    const {data: offers} = useQuery({
        queryKey: ['offers'],
        queryFn: () => OffersApi.getOffers()
    })

    return <>
        <h2>Offers Overview</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created by</th>
                        <th>Created at</th>
                        <th>Starting bid</th>
                        <th>Top bid</th>
                        <th>Instant buy</th>
                    </tr>
                </thead>
                <tbody>
                {offers?.map(offer =>
                        <tr>
                            <td>{offer.name}</td>
                            <td>{offer.userName}</td>
                            <td>{offer.createdAt}</td>
                            <td>{offer.startingBid}</td>
                            <td>{offer.topBid}</td>
                            <td>{offer.instantBuyAmount}</td>
                            <td>
                                <NavLink to={offer.id}>Details</NavLink>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
        <NavLink to="/">Home</NavLink>
    </>
}

export default OfferOverview;