import {FC} from "react";
import {Offer, User} from "../../../../models";
import OfferOverview from "../OfferOverview";
import {NavLink, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ItemsApi, OffersApi} from "../../../../services";

interface OfferOverviewProps {
    offer: Offer,
    seller: User
}
const OfferOverviewItem: FC<OfferOverviewProps> = ({offer, seller}) => {
    const {data: item} = useQuery({
        queryKey: ['item'],
        queryFn: () => ItemsApi.getItemById(offer.id)
    })

    return (
    <div className=" bg-blue-100 hover:bg-blue-200 flex flex-row h-48 m-8 rounded-md justify-between transition-all shadow-lg shadow-gray-300 hover:shadow-xl
                       pr-2 pb-2">
        <section className=" text-lg flex flex-row h-auto">
            <figure>
                <img src={item?.image}
                className=" h-48 w-48 object-cover rounded-md"
                alt={item?.name.concat("-image")} />
            </figure>
            <div className="flex flex-col mx-4 my-2">
                <p><b>{item?.name}</b></p>
                <p>{item?.category}</p>
                <p className="grow text-base">{item?.description}</p>
                <p><b>{offer.price},-</b></p>
            </div>
        </section>
        <section className=" text-lg flex flex-col my-2 justify-between">
            <span><b>Seller: </b>{seller.username}</span>
            <div className=" flex flex-row">
                <figure className=" mr-4">
                    <img src={seller.image}
                    className=" h-12 w-12 object-cover rounded-full"
                    alt={seller.username.concat("-avatar")} />
                </figure>
                <span>{seller.rating}</span>
                <figure className=" ml-1">
                    <img src="/pictures/star.png"
                    className=" h-5 w-5 object-cover"
                    alt="star" />
                </figure>
            </div>
            <NavLink to={"/users/".concat(seller.id)}
                className=" relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-cente "
            >Profile</NavLink>
        </section>
        <section className="flex flex-col my-2 justify-between">
            <NavLink to={"/offers/".concat(offer.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Offer detail</NavLink>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button">Price offer</button>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button">Buy</button>
        </section>
    </div>
    )
}

export default OfferOverviewItem;