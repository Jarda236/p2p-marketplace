import {FC} from "react";
import {Item} from "../../../../models";

interface CounterOfferDetailsItemProps {
    item: Item
}

const CounterOfferDetailsItem:FC<CounterOfferDetailsItemProps> = ({item}) => {
    return <div className={
            "flex flex-row h-48 m-8 rounded-md justify-between transition-all shadow-lg shadow-gray-300 hover:shadow-xl pr-2 pb-2 bg-blue-100 hover:bg-blue-200"
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

export default CounterOfferDetailsItem;