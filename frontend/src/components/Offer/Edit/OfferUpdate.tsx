import {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object} from "yup";
import {ItemsApi, OffersApi} from "../../../services";
import {Item, Offer} from "../../../models";
import {NavLink, useParams} from "react-router-dom";
import ItemOverview from "../../Item/Overview/ItemOverview";
import {useQuery} from "@tanstack/react-query";
import {data} from "autoprefixer";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";

interface UpdateOfferFormData {
    price: number
}

const OfferUpdateSchema = object().shape({
    price: number()
        .default(0)
        .typeError("Price must be a number.") // customize error message for invalid type
        .min(1, "Price must be positive.")
});

const OfferUpdate: FC = () => {
    const {offerId} = useParams();
    const [user] = useRecoilState(userState);
    const [reason, setReason] = useState<string | null>(null);

    const {data: offer} = useQuery({
        queryKey: ['offer'],
        queryFn: () => OffersApi.getOfferById(offerId ?? ""),
        enabled: !!offerId
    })

    const {data: item} = useQuery({
        queryKey: ['item'],
        queryFn: () => ItemsApi.getItemById(offer?.itemId ?? ""),
        enabled: !!offer
    })

    const [checkedItems, changeCheckedItems] = useState<Item[]>([]);

    useEffect(() => {
        if (item) {
            changeCheckedItems([item])
        }
    }, [item]);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<UpdateOfferFormData>({
        resolver: yupResolver(OfferUpdateSchema)
    });

    const onSubmit: SubmitHandler<UpdateOfferFormData> = async (data) => {
        console.log(data, checkedItems);
        if (checkedItems.length === 0) {
            setReason("You have to check one item.")
            return;
        }
        await OffersApi.updateOffer(offer?.id ?? "", {price: data.price, itemId: checkedItems[0].id}).then(() => {
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
            user?.id !== offer?.sellerId ?
                <span>This is not your offer!</span> :
            <>
                <h1>Edit offer</h1>
                <span>Choose your item.</span>
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
                    <button className="green-button" type="submit">Create offer</button>
                </form>
            </> :
            reason === "OK" ?
                <h3>Offer updated!</h3> :
                <>
                    <h3>Unable to update offer.</h3>
                    <p>Reason: {reason}</p>
                </>}
        <NavLink to={"/offers/".concat(offerId ?? "")}>Back</NavLink>
    </>
}

export default OfferUpdate;