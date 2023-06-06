import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {date, number, object, string} from "yup";
import {OffersApi} from "../../../services";
import {Item, OfferCreateBody} from "../../../models";
import {NavLink} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import ItemOverview from "../../Item/Overview/ItemOverview";

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

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<CreateOfferFormData>({
        resolver: yupResolver(OfferCreateSchema)
    });

    const onSubmit: SubmitHandler<CreateOfferFormData> = async (data) => {
        console.log({price: data.price, itemsId: checkedItems.map(i => i.id)})
        await OffersApi.createOffer({price: data.price, itemsId: checkedItems.map(i => i.id)}).then(() => setReason("OK")).catch((reason) => setReason(reason));
    }


    return <>
        {reason === null ?
            <>
                <h1>Create offer</h1>
                <span>Choose your item.</span>
                <ItemOverview
                    checkedItems={checkedItems}
                    changeCheckedItems={changeCheckedItems} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            {...register("price")} />
                        {isSubmitted && errors.price && <span>{errors.price.message}</span>}
                    </div>
                    <button className="green-button" type="submit">Create offer</button>
                </form>
            </> :
            reason === "OK" ?
                <h3>Offer created!</h3> :
                <>
                    <h3>Unable to create offer.</h3>
                    <p>Reason: {reason}</p>
                </>}
        <NavLink to="/offers">Back</NavLink>
    </>
}

export default OfferCreate;