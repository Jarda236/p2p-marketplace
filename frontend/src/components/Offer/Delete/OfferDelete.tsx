import {FC} from "react";
import { OffersApi } from "../../../services";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

const OfferDelete:FC = () => {
    const navigate = useNavigate();
    const {offerId} = useParams();
    const location = useLocation();
    const {sellerId} = location.state;
    const [user] = useRecoilState(userState);

    const deleteOffer = async () => {
        await OffersApi.deleteOfferById(offerId ?? "").catch();
        navigate("/offers");
    }

    if (sellerId !== user?.id) {
        return <span>You can not delete this offer!</span>;
    }

    return <div>
        <span>Do you really want to delete this offer?</span>
        <button type="button" onClick={deleteOffer}>Yes</button>
        <button type="button" onClick={() => navigate(`/offers/${offerId}`)}>No</button>
    </div>
}

export default OfferDelete;