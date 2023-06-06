import {FC, useState} from "react";
import OfferOverview from "../../Offer/Overview/OfferOverview";
import {NavLink, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ItemsApi, UsersApi} from "../../../services"
import ItemOverview from "../../Item/Overview/ItemOverview";
import {Item} from "../../../models";

const UserDetail: FC = () => {
    const {userId} = useParams();

    const [checkedItems, changeCheckedItems] = useState<Item[]>([]);

    const toggleItem = (item: Item): boolean => {
        const index = checkedItems.findIndex(i => i.id === item.id);
        if (index === -1) {
            changeCheckedItems(p => [...p, item]);
        } else {
            changeCheckedItems(p => p.filter((_, i) => i !== index));
        }
        return true;
    }

    const {data: user, refetch} = useQuery({
        queryKey: ['user'],
        queryFn: () => UsersApi.getUserById(userId ?? "")
    })

    const deleteCheckedItems = async () => {
        checkedItems.map(async (item) => {
            item.blocked = true;
            await ItemsApi.deleteItemById(item.id);
        })
    }

    refetch()
    return <>
        <h2>User detail</h2>
        {user ?
            <>
                <section>
                    <p>Username: {user.username}</p>
                    <p>Member from: {user.createdAt}</p>
                </section>
                <section>
                    <h3>Offers by user</h3>
                    <OfferOverview offersBySellerId={user.id}/>
                </section>
                <section>
                    <h3>Purchased items</h3>
                    <OfferOverview offersByBuyerId={user.id} />
                </section>
                <section>
                    <h3>My items</h3>
                    <ItemOverview checkedItems={checkedItems} toggleItem={toggleItem} />
                    <button onClick={deleteCheckedItems}>Delete checked</button>
                </section>
            </> :
            <p>Loading...</p>
        }
        <NavLink to="/offers">Back</NavLink>
    </>
}

export default UserDetail;