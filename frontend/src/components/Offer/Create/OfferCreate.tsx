import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object} from "yup";
import {OffersApi} from "../../../services";
import {Item} from "../../../models";
import {NavLink} from "react-router-dom";
import ItemOverview from "../../Item/Overview/ItemOverview";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

interface CreateOfferFormData {
    price: number
}

const OfferCreateSchema = object().shape({
    price: number()
        .default(0)
        .typeError("Price must be a number.") // customize error message for invalid type
        .min(1, "Price must be positive.")
});

const OfferCreate: FC = () => {
    const [reason, setReason] = useState<string | null>(null);

    const [checkedItems, changeCheckedItems] = useState<Item[]>([]);

    const [user] = useRecoilState(userState);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<CreateOfferFormData>({
        resolver: yupResolver(OfferCreateSchema)
    });

    const onSubmit: SubmitHandler<CreateOfferFormData> = async (data) => {
        if (checkedItems.length === 0) {
            setReason("You have to check one item.")
            return;
        }
        await OffersApi.createOffer({
            userId: user?.id ?? "",
            userName: user?.name ?? "",
            price: data.price,
            itemId: checkedItems[0].id,
            image: "dadsad"
        }).then(() => {
            setReason("OK");
            checkedItems[0].blocked = true;
        }).catch((reason) => setReason(reason.message));
    }

    const toggleItem = (item: Item): boolean => {
        if (checkedItems.length == 1) {
            if (checkedItems[0].id === item.id) {
                changeCheckedItems([]);
                return true;
            }
            return false;
        }
        changeCheckedItems([item]);
        return true;
    }

    return <>
        {reason === null ?
            <div className="mt-4">
                <span className="mx-10 bg-blue-100 rounded-lg px-2 py-2 shadow-lg shadow-gray-300s">
                    Creating offer, choose your item:
                </span>
                <ItemOverview
                    checkedItems={checkedItems}
                    toggleItem={toggleItem} />
                
                <div className="bg-slate-400 rounded-lg shadow shadow-slate-700 ml-10 p-2 max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex mb-4">
                            <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-900 mr-2">Price:</label>
                            <input
                                id="price"
                                type="number"
                                {...register("price")}
                                className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-1"/>
                            {isSubmitted && errors.price && <span>{errors.price.message}</span>}
                        </div>
                        <button type="submit"
                            className="center mx-auto text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5">
                            Create offer
                        </button>
                    </form>
                </div>
    
            </div> :
            reason === "OK" ?
                <div className="mt-4 mx-10 bg-green-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Offer created!</h3> 
                </div>:
                <div className="mt-4 mx-10 bg-red-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Unable to create offer.</h3>
                    <p>Reason: {reason}</p>
                </div>}
        
            <div className=" ml-10 my-5">
                <NavLink to="/offers" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5">
                    Back
                </NavLink>
            </div>
    </>
}

export default OfferCreate;