import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {ItemsApi, OffersApi} from "../../../services"
import {NavLink, useParams} from "react-router-dom";
import { Item } from "../../../models";

const OfferDetail: FC = () => {
    const {offerId} = useParams();

    const {data: offer} = useQuery({
        queryKey: ['offer'],
        queryFn: () => OffersApi.getOfferById(offerId ?? "")
    })

    const {data: item} = useQuery({
        queryKey: ['item'],
        queryFn: () => ItemsApi.getItemById(offerId ?? "")
    })

    return (
        <div className=" bg-blue-100 mx-auto my-4 max-w-3xl rounded-lg shadow-lg shadow-gray-300 p-4">
            <h2 className=" text-xl font-bold leading-tight tracking-tight text-center mb-4">Offer details</h2>
            <div>
                {offer ? 
                    <div className=" flex flex-wrap">
                        <div className=" max-w-xs max-h-xs mr-4">
                            <img src={item?.image} alt="Item image" className=" rounded-lg"/>
                        </div>
                        <div className="flex flex-col">
                            <p className=" text-lg  font-bold">{item?.name}</p>
                            <p className=" mb-2">Category: {item?.category}</p>
                            <p className=" max-w-xs text-sm">{item?.description}</p>
                            <p className=" mt-2">Seller: <NavLink to={"/users/".concat(offer.sellerId)} className=" font-bold text-black hover:underline mt-4">
                                {offer.sellerName}
                                </NavLink></p>
                            <p>Created at: {offer.createdAt}</p>
                            <p className="  font-bold">Price: {offer.price}</p>
                            <div className=" mt-2">
                            {offer.buyerId ?
                                <span className=" text-red-500 font-bold text-xl">SOLD</span> :
                                <div className=" flex flex-row justify-between">
                                    <button className="focus:outline-none text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                        Send offer
                                    </button>
                                    <button className="focus:outline-none text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-lime-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                                        Buy
                                    </button>
                                </div>
                            }
                            </div>
                        </div>
                    </div> :
                    <p>Loading...</p>
                }
            </div>
            <NavLink to="/offers" className=" font-bold text-black hover:underline mt-4">Back</NavLink>
        </div>
    )
}

export default OfferDetail;