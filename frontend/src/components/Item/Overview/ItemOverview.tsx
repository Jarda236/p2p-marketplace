import React, {FC, useState} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {useQuery} from "@tanstack/react-query";
import { ItemsApi } from "../../../services";
import ItemOverviewItem from "./Item/ItemOverviewItem";
import {Item} from "../../../models";

interface ItemOverviewProps {
    checkedItems: Item[]
    changeCheckedItems: React.Dispatch<React.SetStateAction<Item[]>>
}
const ItemOverview: FC<ItemOverviewProps> = ({checkedItems, changeCheckedItems}) => {
    const [user] = useRecoilState(userState);

    const {data: items} = useQuery({
        queryKey: ['items'],
        queryFn: () => ItemsApi.getItems()
    })

    const toggleItem = (item: Item) => {
        const index = checkedItems.findIndex(i => i.id === item.id);
        if (index === -1) {
            changeCheckedItems(p => [...p, item]);
        } else {
            changeCheckedItems(p => p.filter((_, i) => i !== index));
        }
    }

    return <div>
        {checkedItems.map(i => <p key={i.id}>{i.name}</p>)}
        {items ?
            <ul>
                {items.map(item =>
                        <li key={item.id}>
                            <ItemOverviewItem item={item} toggleItem={toggleItem} />
                        </li>)}
            </ul> :
        <span>Loading...</span>}
    </div>
}

export default ItemOverview;