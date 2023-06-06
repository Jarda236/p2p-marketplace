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
            .max(user ? user.account.balance : 0, "Check your balance.")
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
        await CounterOffersApi.createCounterOffer({offerId: offerId ?? "", price: data.price, itemsId: checkedItems.map(i => i.id)}).then(() => setReason("OK")).catch((reason) => setReason(reason));
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
            <>
                <h1>Create counter offer</h1>
                <span>Choose your items.</span>
                <ItemOverview
                    checkedItems={checkedItems}
                    toggleItem={toggleItem} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            {...register("price")} />
                        {isSubmitted && errors.price && <span>{errors.price.message}</span>}
                    </div>
                    <button className="green-button" type="submit">Create counter offer</button>
                </form>
            </> :
            reason === "OK" ?
                <h3>Counter offer created!</h3> :
                <>
                    <h3>Unable to create counter offer.</h3>
                    <p>Reason: {reason}</p>
                </>}
        <NavLink to={`/offers/${offerId}`}>Back</NavLink>
    </>
}

export default CounterOfferCreate;