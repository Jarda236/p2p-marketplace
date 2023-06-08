import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object} from "yup";
import {CounterOffersApi} from "../../../services";
import {Item} from "../../../models";
import {NavLink, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import ItemOverview from "../../Item/Overview/ItemOverview";

interface CreateOfferCounterFormData {
    price: number
}

const CounterOfferCreate: FC = () => {
    const [user] = useRecoilState(userState);
    const CounterOfferCreateSchema = object().shape({
        price: number()
            .default(0)
            .typeError("Price must be a number.") // customize error message for invalid type
            .min(1, "Price must be positive.")
            .max(user ? user.fundsAccount.balance : 0, "Check your balance.")
    });

    const {offerId} = useParams();
    const [reason, setReason] = useState<string | null>(null);

    const [checkedItems, changeCheckedItems] = useState<Item[]>([]);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<CreateOfferCounterFormData>({
        resolver: yupResolver(CounterOfferCreateSchema)
    });

    const onSubmit: SubmitHandler<CreateOfferCounterFormData> = async (data) => {
        if (checkedItems.length === 0) {
            setReason("You have to check one item.")
            return;
        }
        await CounterOffersApi.createCounterOffer({
            offerId: offerId ?? "",
            userId: user?.id ?? "",
            status: null,
            price: data.price,
            itemsID: checkedItems.map(i => {
                i.blocked = true;
                return i.id;
            })
        }).then(() => setReason("OK")).catch((reason) => setReason(reason.message));
    }

    const toggleItem = (item: Item): boolean => {
        const index = checkedItems.findIndex(i => i.id === item.id);
        if (index === -1) {
            changeCheckedItems(p => [...p, item]);
        } else {
            changeCheckedItems(p => p.filter((_, i) => i !== index));
        }
        return true;
    }

    return <>
        {reason === null ?
            <div className="mt-4">
                <span className="mx-10 bg-blue-100 rounded-lg px-2 py-2 shadow-lg shadow-gray-300s">
                    Creating counter-offer, choose your items:
                </span>

                <ItemOverview
                    checkedItems={checkedItems}
                    toggleItem={toggleItem}/>

                <div className="bg-slate-400 rounded-lg shadow shadow-slate-700 ml-10 p-2 max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex mb-4">
                            <label htmlFor="price"
                                   className="mb-2 text-sm font-medium text-gray-900 mr-2">Price:</label>
                            <input
                                id="price"
                                type="number"
                                {...register("price")}
                                className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-1"/>
                            {isSubmitted && errors.price && <span>{errors.price.message}</span>}
                        </div>
                        <button
                            className="center mx-auto text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5"
                            type="submit">
                            Create counter-offer
                        </button>
                    </form>
                </div>
            </div> :
            reason === "OK" ?
                <div className="mt-4 mx-10 bg-green-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Counter-offer created!</h3>
                </div>
                :
                <div className="mt-4 mx-10 bg-red-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Unable to create counter-offer.</h3>
                    <p>Reason: {reason}</p>
                </div>}

        <div className=" ml-10 my-5">
            <NavLink to={`/offers/${offerId}`}
                     className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5">
                Back
            </NavLink>
        </div>
    </>
}

export default CounterOfferCreate;