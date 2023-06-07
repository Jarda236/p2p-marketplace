import {FC} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import { CounterOffersApi } from "../../../services";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import CounterOfferOverviewItem from "./Item/CounterOfferOverviewItem";

const CounterOfferOverview:FC = () => {
    const {offerId} = useParams();

    const {data: counters} = useQuery({
        queryKey: ['counters'],
        queryFn: () => CounterOffersApi.getCounterOffersByOfferId(offerId ?? ""),
        enabled: !!offerId
    })

    return <>
        <h2>Counter-Offers</h2>
        <ul>
            {counters ?
                counters.map(counter =>
                    <li key={counter.id}>
                        <CounterOfferOverviewItem counter={counter} />
                    </li>) :
                <span>Loading...</span>}
        </ul>
        <NavLink to={`/offers/${offerId}`}>Back</NavLink>
    </>
}

export default CounterOfferOverview;