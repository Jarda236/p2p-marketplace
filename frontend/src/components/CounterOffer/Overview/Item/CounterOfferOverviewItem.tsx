import {FC} from "react";
import {CounterOffer} from "../../../../models";
import {NavLink} from "react-router-dom";

interface CounterOfferOverviewItemProps {
    counter: CounterOffer
}

const CounterOfferOverviewItem:FC<CounterOfferOverviewItemProps> = ({counter}) => {
    return (
    <div className="mt-2 sm:mt-4 p-2 sm:px-4 bg-blue-100 rounded-lg mx-2 sm:mx-10 flex flex-col shadow-lg shadow-gray-300 hover:bg-blue-200 hover:shadow-xl">
        <span>Price: {counter.price}</span>
        <span>Number of items: {counter.itemsID.length}</span>
        <NavLink to={`/offers/${counter.offerId}/counter-offers/${counter.id}`}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mx-auto">
                Details
        </NavLink>
    </div>
    )
}

export default CounterOfferOverviewItem;