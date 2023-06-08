import {FC, useEffect, useState} from "react";
import OfferOverview from "../../Offer/Overview/OfferOverview";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ItemsApi, UsersApi} from "../../../services"
import ItemOverview from "../../Item/Overview/ItemOverview";
import {Item} from "../../../models";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

const UserDetails: FC = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [globalUser, setGlobalUser] = useRecoilState(userState);

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

    const addCash = () => {
        if (globalUser) {
            UsersApi.addCash(500).then(() => {
                const tempUser = JSON.parse((JSON.stringify(globalUser)));
                tempUser.fundsAccount.balance += 500;
                setGlobalUser(tempUser);
            });
        }
    }

    useEffect(() => {
        refetch();
    })

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
                            <p className=" font-bold text-lg" >{user.name}</p>
                            <div className="flex mb-4">
                                <p className=" font-bold mr-1">Rating: {user.rating}</p>
                                <img src="/pictures/star.png" alt="Star" className="w-6 h-6 inline-block"/>
                            </div>
                            <p>Email: {user.email}</p>
                            <p>Phone number: {user.phone}</p>
                            <p>City: {user.city}</p>
                            <p>Member from: {new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                        {(userId === globalUser?.id) && <button type="button" onClick={() => navigate("counter-offers")}>My counter-offers</button>}
                        <button type="button" onClick={addCash}>Add 500 cash</button>
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
                    {globalUser?.id === userId && <section>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className=" w-11/12 h-1 my-8 bg-gray-200 border-0 rounded"/>
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
                                <h3>My items</h3>
                            </span>
                        </div>
                        <button type="button" onClick={() => navigate("create-item")}  className=" ml-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" >
                            Create item
                        </button>
                        <ItemOverview checkedItems={checkedItems} toggleItem={toggleItem} />
                        <button onClick={deleteCheckedItems} className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 mx-10 mb-5 float-right">
                            Delete checked
                        </button>
                    </section>}
                </> :
                <p className=" text-center text-lg">Loading...</p>
            }

            <div className=" ml-10 my-5">
                <NavLink to="/offers" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5">
                    Back
                </NavLink>
            </div>
        </div>
    );
}

export default UserDetails;