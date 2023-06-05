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
                <p>Seller: <NavLink to={"/users/".concat(offer.sellerId)}>{offer.userName}</NavLink></p>
            <p>Created at: {offer.createdAt}</p>
            <p>Top offer: {offer.topOffer}</p>
            <p>Price: {offer.price}</p>
            {offer?.sold ?
                <p>SOLD</p> :
                <>
                    <button>Send offer</button>
                    <button>Buy</button>
                </>
            }
            </> :
            <p>Loading...</p>
        }
        <NavLink to="/offers">Back</NavLink>
    </>
}

export default OfferDetail;