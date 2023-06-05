import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {OffersApi} from "../../../services"
import {NavLink, useParams} from "react-router-dom";

const OfferDetail: FC = () => {
    const {offerId} = useParams();

    const {data: offer} = useQuery({
        queryKey: ['offer'],
        queryFn: () => OffersApi.getOfferById(offerId ?? "")
    })

    return <>
        <h2>Offer detail</h2>
        {offer ? <>
            <p>Name: {offer.name}</p>
            <p>Description: {offer.description}</p>
                <p>Seller: <NavLink to={"/users/".concat(offer.userId)}>{offer.userName}</NavLink></p>
            <p>Created at: {offer.createdAt}</p>
            <p>Starting bid: {offer.startingBid}</p>
            <p>Top bid: {offer.topBid}</p>
            <p>Instant buy for {offer.instantBuyAmount}</p>
            {offer?.sold ?
                <p>SOLD</p> :
                <>
                    <button>Bid</button>
                    <button>Instant buy</button>
                </>
            }
            </> :
            <p>Loading...</p>
        }
        <NavLink to="/offers">Back</NavLink>
    </>
}

export default OfferDetail;