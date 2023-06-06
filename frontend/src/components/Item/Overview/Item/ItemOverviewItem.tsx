import {FC, useState} from "react";
import {Item} from "../../../../models";

interface ItemOverviewItemProps {
    item: Item,
    toggleItem: (item: Item) => boolean,
    checked: boolean
}
const ItemOverviewItem: FC<ItemOverviewItemProps> = ({item, toggleItem, checked}) => {
    /*const [checked, toggleChecked] = useState<boolean>(toggleCheck ?? false);*/
    return <div
        onClick={() => {
            !item.blocked && toggleItem(item) && !checked
        }}
        className={
        "flex flex-row h-48 m-8 rounded-md justify-between transition-all shadow-lg shadow-gray-300 hover:shadow-xl pr-2 pb-2 ".concat(checked ? "bg-red-100 hover:bg-red-200" : (item.blocked ? "bg-yellow-100 hover:bg-yellow-200" : "bg-blue-100 hover:bg-blue-200"))
    }>
        <section className=" text-lg flex flex-row h-auto">
            <figure>
                <img src={item.image}
                     className=" h-48 w-48 object-cover rounded-md"
                     alt={item.name.concat("-image")} />
            </figure>
            <div className="flex flex-col mx-4 my-2">
                <p><b>{item.name}</b></p>
                <p>{item.category}</p>
                <p className="grow text-base">{item.description}</p>
            </div>
        </section>
    </div>
}

export default ItemOverviewItem;