import {FC} from "react";
import CounterOfferOverview from "./CounterOfferOverview";
import {useParams} from "react-router-dom";

const UserCounterOfferOverview:FC = () => {
    const {userId} = useParams();

    return <>
        <CounterOfferOverview buyerId={userId} />
    </>
}

export default UserCounterOfferOverview;