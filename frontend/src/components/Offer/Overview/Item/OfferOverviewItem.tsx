import {FC} from "react";
import {Offer, User} from "../../../../models";
import OfferOverview from "../OfferOverview";
import {NavLink, useNavigate} from "react-router-dom";

interface OfferOverviewProps {
    offer: Offer,
    seller: User
}
const OfferOverviewItem: FC<OfferOverviewProps> = ({offer, seller}) => {
    return <div>
        <section>
            <figure>
                <img src="" alt={offer.name.concat("-image")} />
            </figure>
            <div>
                <p><b>{offer.name}</b></p>
                <p>{offer.category.name}</p>
                <p>{offer.description}</p>
                <p><b>{offer.price}</b></p>
            </div>
        </section>
        <section>
            <span><b>Seller: </b>{seller.name}</span>
            <div>
                <figure>
                    <img src="" alt={seller.name.concat("-avatar")} />
                </figure>
                <span>{seller.rating}</span>
            </div>
            <NavLink to={"/users/".concat(seller.id)}>Profile</NavLink>
        </section>
        <section>
            <NavLink to={"/offers/".concat(offer.id)}>Offer detail</NavLink>
            <button type="button">Price offer</button>
            <button type="button">Buy</button>
        </section>
    </div>
}

export default OfferOverviewItem;