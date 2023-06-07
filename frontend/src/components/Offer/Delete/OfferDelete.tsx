import {FC} from "react";
import { OffersApi } from "../../../services";
import {useNavigate, useParams} from "react-router-dom";

const OfferDelete:FC = () => {
    const navigate = useNavigate();
    const {offerId} = useParams();

    const deleteOffer = async () => {
        await OffersApi.deleteOfferById(offerId ?? "").catch();
        navigate("/offers");
    }

    return <div>
        <span>Do you really want to delete this offer?</span>
        <button type="button" onClick={deleteOffer}>Yes</button>
        <button type="button" onClick={() => navigate(`/offers/${offerId}`)}>No</button>
    </div>
}

export default OfferDelete;