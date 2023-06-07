import {FC} from "react";
import {CounterOffer} from "../../../../models";
import {NavLink} from "react-router-dom";

interface CounterOfferOverviewItemProps {
    counter: CounterOffer
}

const CounterOfferOverviewItem:FC<CounterOfferOverviewItemProps> = ({counter}) => {
    return <div>
        <span>Price: {counter.price}</span>
        <span>Number of items: {counter.itemsId.length}</span>
        <NavLink to={`${counter.id}`}>Details</NavLink>
    </div>
}

export default CounterOfferOverviewItem;