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
            <>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Member from: {user.createdAt}</p>
                <h3>Offers by user</h3>
                <OfferOverview offersBySellerId={user.id}/>
                <h3>Purchased items</h3>
                <OfferOverview offersByBuyerId={user.id} />
            </> :
            <p>Loading...</p>
        }
    </>
}

export default UserDetail;