import {FC, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { OffersApi } from "../../../services";
import Popup from "../../Popup/Popup";

interface ResultType {
    success: boolean;
    text: string;
    fallbackUrl: string;
}

const OfferBuy: FC = () => {
    const {offerId} = useParams();
    const navigate = useNavigate();

    const [result, changeResult] = useState<ResultType | null>(null);

    const buy = async () => {
        await OffersApi.offerBuy(offerId ?? "")
            .then(() => changeResult({success: true, text: "Successfully bought.", fallbackUrl: `/offers`}))
            .catch(() => changeResult({success: false, text: "Buy unsuccessfull.", fallbackUrl: `/offers`}))
    }

    return <div>
        {result !== null && <Popup text={result.text} success={result.success} fallbackUrl={result.fallbackUrl} />}
        <span>Do you really want to buy this item?</span>
        <button type="button" onClick={buy}>Yes</button>
        <button type="button" onClick={() => navigate(`/offers/${offerId}`)}>No</button>
    </div>
}

export default OfferBuy;