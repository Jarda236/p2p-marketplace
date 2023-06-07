import {FC} from "react";
import CounterOfferOverview from "./CounterOfferOverview";
import {useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

const UserCounterOfferOverview:FC = () => {
    const {userId} = useParams();
    const [user] = useRecoilState(userState);

    if (user?.id !== userId) {
        return <span>You can not view other user counter-offers.</span>
    }

    return <>
        <CounterOfferOverview buyerId={userId} />
    </>
}

export default UserCounterOfferOverview;