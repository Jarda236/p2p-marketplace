import {FC, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CounterOffersApi, ItemsApi} from "../../../services";
import {queryKey} from "@tanstack/react-query/build/lib/__tests__/utils";
import CounterOfferDetailsItem from "./CounterOfferDetailsItem/CounterOfferDetailsItem";
import {set} from "react-hook-form";

const CounterOfferDetails: FC = () => {
    const {offerId, counterId} = useParams();
    const navigate = useNavigate();

    const [reason, setReason] = useState<string | null>(null);

    const {data: counter} = useQuery({
        queryKey: ['counter'],
        queryFn: () => CounterOffersApi.getCounterOfferById(counterId ?? ""),
        enabled: !!counterId
    })

    const items = useQueries({
        queries: counter?.itemsId.map((itemId) => {
            return {
            queryKey: ["item", itemId],
                queryFn: () => ItemsApi.getItemById(itemId)
            };
        }) || [],
    });

    const acceptOffer = async () => {
        await CounterOffersApi.acceptCounterOffer(counter?.id ?? "")
            .then(() => {
                setReason("OK");
                navigate(`/offers`);
            })
            .catch((r) => setReason(r.message));
    }

    const declineOffer = async () => {
        await CounterOffersApi.declineCounterOffer(counter?.id ?? "")
            .then(() => {
                setReason("OK");
                navigate(`/offers/${offerId}/counter-offers`);
            })
            .catch((r) => setReason(r.message));

    }

    return <>
        <h2>Counter offer details</h2>
        {counter && items ?
            <>
                <section>
                    <span>Price: {counter?.price}</span>
                    <span>Items:</span>
                    <ul>
                        {items.map(item => item.data && <CounterOfferDetailsItem item={item.data} key={item.data.id} />)}
                    </ul>
                </section>
                <section>
                    <button
                        type="button"
                        onClick={acceptOffer}>Accept</button>
                    <button
                        type="button"
                        onClick={declineOffer}>Decline</button>
                </section>
                {reason !== null && (reason === "OK" ?
                <h3>Operation successfully performed!</h3> :
                    <>
                        <h3>Unable to perform operation.</h3>
                        <p>Reason: {reason}</p>
                    </>)}
                </> :
            <span>Loading...</span>}
        <NavLink to={`/offers/${offerId}/counter-offers`}>Back</NavLink>
    </>
}

export default CounterOfferDetails;