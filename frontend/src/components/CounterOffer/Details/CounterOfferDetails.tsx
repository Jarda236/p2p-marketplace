import {FC, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useQueries, useQuery} from "@tanstack/react-query";
import {CounterOffersApi, ItemsApi} from "../../../services";
import CounterOfferDetailsItem from "./CounterOfferDetailsItem/CounterOfferDetailsItem";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

const CounterOfferDetails: FC = () => {
    const {offerId, counterId} = useParams();
    const navigate = useNavigate();
    const [user] = useRecoilState(userState);

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
        <h2 className=" mt-2 sm:mt-4 mx-2 sm:mx-10 bg-blue-100 rounded-lg px-2 py-2 shadow-lg shadow-gray-300s">
            Counter-offer details:
        </h2>
        <div>
        {counter && items ?
            <>
                <section className="mt-2 mb-2 sm:mt-4 p-2 sm:px-4 bg-sky-100 rounded-lg mx-2 sm:mx-10 flex flex-col shadow-lg shadow-gray-300 hover:bg-blue-200 hover:shadow-xl">
                    <span>Price: {counter?.price}</span>
                    <span>Items:</span>
                    <ul>
                        {items.map(item => item.data && <CounterOfferDetailsItem item={item.data} key={item.data.id}/>)}
                    </ul>
                </section>

                <div className="ml-2 sm:ml-10 mb-2">
                {counter.buyerId === user?.id ?
                    <button
                        className=" text-xs sm:text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-blue-600 focus:ring-4 font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                        type="button"
                        onClick={() => navigate("edit")}>
                            Edit
                    </button>
                    : <>
                        <section>
                            <button
                                type="button"
                                onClick={acceptOffer}>Accept
                            </button>
                            <button
                                type="button"
                                onClick={declineOffer}>Decline
                            </button>
                        </section>
                        {reason !== null && (reason === "OK" ?
                            <h3>Operation successfully performed!</h3> :
                            <>
                                <h3>Unable to perform operation.</h3>
                                <p>Reason: {reason}</p>
                            </>)}</>}
                </div>
            </> :
            <span className=" text-center">Loading...</span>}
        </div>
        <NavLink to={`/offers/${offerId}/counter-offers`}
                className="ml-2 sm:ml-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mx-auto">
                Back
        </NavLink>   
    </>
}

export default CounterOfferDetails;