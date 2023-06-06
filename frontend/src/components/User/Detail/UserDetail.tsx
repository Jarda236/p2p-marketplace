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
            item.deleted = true;
            await ItemsApi.deleteItemById(item.id);
        })
        changeCheckedItems([]);
    }

    refetch()
    return(
        <div>
            <div className=" bg-blue-100 mx-auto my-4 max-w-3xl rounded-lg shadow-lg shadow-gray-300 p-4">
                <h2 className=" text-xl font-bold leading-tight tracking-tight text-center mb-4">
                    User detail
                </h2>
                {user ?
                    <div className="flex flex-wrap">
                        <img src={user.image} alt="User image" className=" rounded-lg max-w-xs max-h-xs"/>
                        <div className=" ml-4">
                            <p className=" font-bold text-lg" >{user.username}</p>
                            <div className="flex mb-4">
                                <p className=" font-bold mr-1">Rating: {user.rating}</p>
                                <img src="/pictures/star.png" alt="Star" className="w-6 h-6 inline-block"/>
                            </div>
                            <p>Email: {user.email}</p>
                            <p>Phone number: {user.phone}</p>
                            <p>City: {user.city}</p>
                            <p>Member from: {user.createdAt}</p>
                        </div>
                    </div> :
                    <p className=" text-center text-lg">Loading...</p>
                }
            </div>

            {user ?
                <>
                    <section>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className=" w-11/12 h-1 my-8 bg-gray-200 border-0 rounded"/>
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                <h3>Offers by user</h3>
                            </span>
                        </div>
                        <OfferOverview offersBySellerId={user.id}/>
                    </section>
                    <section>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className=" w-11/12 h-1 my-8 bg-gray-200 border-0 rounded"/>
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                            <h3>Purchased items</h3>
                            </span>
                        </div>
                        <OfferOverview offersByBuyerId={user.id} />
                    </section>
                    <section>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className=" w-11/12 h-1 my-8 bg-gray-200 border-0 rounded"/>
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                            <h3>My items</h3>
                            </span>
                        </div>
                        <ItemOverview checkedItems={checkedItems} toggleItem={toggleItem} />
                        <button onClick={deleteCheckedItems}>Delete checked</button>
                    </section>
                </> :
                <p className=" text-center text-lg">Loading...</p>
            }

            <NavLink to="/offers">Back</NavLink>
        </div>
    );
}

export default UserDetail;