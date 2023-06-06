import {FC} from "react";
import {Offer, User} from "../../../../models";
import OfferOverview from "../OfferOverview";
import {NavLink, useNavigate} from "react-router-dom";

interface OfferOverviewProps {
    offer: Offer,
    seller: User
}
const OfferOverviewItem: FC<OfferOverviewProps> = ({offer, seller}) => {
    return (
    <div className=" bg-blue-200 hover:bg-blue-400 border-blue-500 flex flex-row h-48 space-x-2 m-8 rounded-md justify-between border">
        <section className=" flex flex-row h-auto">
            <figure>
                <img src="/pictures/example.jpg " 
                className=" h-48"
                alt={offer.name.concat("-image")} />
            </figure>
            <div className="flex flex-col mx-4 my-2">
                <p><b>{offer.name}</b></p>
                <p>{offer.category.name}</p>
                <p>{offer.description}</p>
                <p><b>{offer.price}</b></p>
            </div>
        </section>
        <section className="flex flex-col my-2 justify-between">
            <span><b>Seller: </b>{seller.name}</span>
            <div>
                <figure>
                    <img src="" alt={seller.name.concat("-avatar")} />
                </figure>
                <span>{seller.rating}</span>
            </div>
            <NavLink to={"/users/".concat(seller.id)}>Profile</NavLink>
        </section>
        <section className="flex flex-col my-2 justify-between">
            <NavLink to={"/offers/".concat(offer.id)}>Offer detail</NavLink>
            <button className="" type="button">Price offer</button>
            <button type="button">Buy</button>
        </section>
    </div>
    )
}

export default OfferOverviewItem;