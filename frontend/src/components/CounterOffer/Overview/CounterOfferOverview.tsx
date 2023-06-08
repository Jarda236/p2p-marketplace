import {FC} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { CounterOffersApi } from "../../../services";
import CounterOfferOverviewItem from "./Item/CounterOfferOverviewItem";

interface CounterOfferOverview {
    buyerId?: string
}
const CounterOfferOverview:FC<CounterOfferOverview> = ({buyerId}) => {
    const {offerId} = useParams();

    const {data: counters} = useQuery({
        queryKey: ['counters'],
        queryFn: () => buyerId ? CounterOffersApi.getCounterOffersByBuyerId(buyerId) : CounterOffersApi.getCounterOffersByOfferId(offerId ?? ""),
        enabled: !!offerId || !!buyerId
    })

    return <>
        <h2 className=" mt-2 sm:mt-4 mx-2 sm:mx-10 bg-blue-100 rounded-lg px-2 py-2 shadow-lg shadow-gray-300s">
            Counter-Offers
        </h2>
        <ul className="mb-4">
            {counters ?
                counters.map(counter =>
                    <li key={counter.id}>
                        <CounterOfferOverviewItem counter={counter} />
                    </li>) :
                <span>Loading...</span>}
        </ul>
        
        <NavLink to={`/offers/${offerId}`}
                className="ml-2 sm:ml-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mx-auto">
                Back
        </NavLink>
    </>
}

export default CounterOfferOverview;