import {FC} from "react";
import CounterOfferOverview from "./CounterOfferOverview";
import {useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

const UserCounterOfferOverview:FC = () => {
    const {userId} = useParams();
    const [user] = useRecoilState(userState);

    if (user?.id !== userId) {
        return(
            <div className="mt-4 mx-10 bg-red-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <span>You can not view other user counter-offers.</span>
                </div>
        ) 
        
    }

    return <>
        <CounterOfferOverview buyerId={userId} />
    </>
}

export default UserCounterOfferOverview;