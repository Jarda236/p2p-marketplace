import {FC, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import { OffersApi } from "../../../services";
import Popup from "../../Popup/Popup";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {tuple} from "yup";

interface ResultType {
    success: boolean;
    text: string;
    fallbackUrl: string;
}

const OfferBuy: FC = () => {
    const {offerId} = useParams();
    const navigate = useNavigate();

    const [result, changeResult] = useState<ResultType | null>(null);
    const [user] = useRecoilState(userState);

    const buy = async () => {
        await OffersApi.offerBuy(offerId ?? "")
            .then(() => changeResult({success: true, text: "Successfully bought.", fallbackUrl: `/offers`}))
            .catch(() => changeResult({success: false, text: "Buy unsuccessfull.", fallbackUrl: `/offers`}))
    }

    if (result !== null && result) {
        return <>
            <span>Successfully bought!</span>
            <NavLink to="/">Back</NavLink>
        </>
    }
    if (result === false) {
        return <>
            <span>Buying proccess failed!</span>;
            <NavLink to="/">Back</NavLink>
        </>
    }

    return <div>
        <span>Do you really want to buy this item?</span>
        <button type="button" onClick={buy}>Yes</button>
        <button type="button" onClick={() => navigate(`/offers/${offerId}`)}>No</button>
    </div>
}

export default OfferBuy;