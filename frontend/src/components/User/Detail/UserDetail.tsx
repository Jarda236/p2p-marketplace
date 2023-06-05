import {FC} from "react";
import OfferOverview from "../../Offer/Overview/OfferOverview";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {UsersApi} from "../../../services"

const UserDetail: FC = () => {
    const {userId} = useParams();

    const {data: user} = useQuery({
        queryKey: ['user'],
        queryFn: () => UsersApi.getUserById(userId ?? "")
    })

    return <>
        <h2>User detail</h2>
        {user ?
            <OfferOverview offersByUserId={user.id}/> :
            <p>Loading...</p>
        }
    </>
}

export default UserDetail;