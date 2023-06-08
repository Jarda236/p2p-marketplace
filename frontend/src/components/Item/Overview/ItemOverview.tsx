import React, {FC} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {useQuery} from "@tanstack/react-query";
import { ItemsApi } from "../../../services";
import ItemOverviewItem from "./Item/ItemOverviewItem";
import {Item} from "../../../models";

interface ItemOverviewProps {
    checkedItems: Item[],
    toggleItem: (item: Item) => boolean,
}
const ItemOverview: FC<ItemOverviewProps> = ({checkedItems, toggleItem}) => {
    const [user] = useRecoilState(userState);

    const {data: items} = useQuery({
        queryKey: ['items'],
        queryFn: () => ItemsApi.getItems()
    })
    return <div>
        {items ?
            <ul>
                {items.map(item =>
                        !item.deleted && <li key={item.id}>
                            <ItemOverviewItem item={item} toggleItem={toggleItem} checked={checkedItems.findIndex(i => i.id === item.id) !== -1 && true}/>
                        </li>)}
            </ul> :
        <div className="my-10 p-4 mx-10 text-center bg-slate-100">
        <span >
            Loading...
        </span>
        </div>}
    </div>
}

export default ItemOverview;