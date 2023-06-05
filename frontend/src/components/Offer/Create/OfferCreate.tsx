import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {date, number, object, string} from "yup";
import {OffersApi} from "../../../services";
import {OfferCreateBody} from "../../../models";
import {NavLink} from "react-router-dom";

const OfferCreateSchema = object().shape({
    name: string()
        .required("This field is required.")
        .min(3, "Name must be at lest 3 characters long.")
        .max(20, "Name can not be more than 20 characters."),
    description: string()
        .max(500, "500 characters max."),
    price: number()
        .default(0)
        .typeError("Price must be a number.") // customize error message for invalid type
        .min(1, "Price must be positive."),
});
const OfferCreate: FC = () => {
    const [reason, setReason] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<OfferCreateBody>({
        resolver: yupResolver(OfferCreateSchema)
    });

    const onSubmit: SubmitHandler<OfferCreateBody> = async (data) => {
        await OffersApi.createOffer(data).then(() => setReason("OK")).catch((reason) => setReason(reason));
    }


    return <>
        {reason === null ?
            <>
                <h1>Create offer</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" {...register("name")} />
                        {isSubmitted && errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" {...register("description")} />
                        {isSubmitted && errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input type="number" {...register("price")} />
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