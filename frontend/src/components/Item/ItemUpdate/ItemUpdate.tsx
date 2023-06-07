import {FC, useState} from "react";
import {object, string} from "yup";
import {NavLink, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CategoriesApi, ItemsApi} from "../../../services";
import {useQuery} from "@tanstack/react-query";
import CategoryFilter from "../../Offer/Overview/Filters/CategoryFilter";

interface UpdateItemFormData {
    name: string,
    description: string
}

const ItemUpdateSchema = object().shape({
    name: string().required("Name is required.").max(20, "Max 20 characters"),
    description: string().required("Description is required.").max(500, "Max 500 characters.")
});

const ItemUpdate:FC = () => {
    const [reason, setReason] = useState<string | null>(null);
    const [showCategories, toggleShowCategories] = useState<boolean>(false);
    const [selectedCategory, changeSelectedCategory] = useState<string[]>([]);
    const {userId, itemId} = useParams();
    const [user] = useRecoilState(userState);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<UpdateItemFormData>({
        resolver: yupResolver(ItemUpdateSchema)
    });

    const onSubmit: SubmitHandler<UpdateItemFormData> = async (data) => {
        if (selectedCategory.length === 0) {
            setReason("You have to check one category.");
        }
        await ItemsApi.updateItem({name: data.name, description: data.description, image: "", category: selectedCategory[0]}).then(() => {
            setReason("OK");
        }).catch((reason) => setReason(reason.message));
    }

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoriesApi.getCategories()
    })

    const {data: item} = useQuery({
        queryKey: ['item'],
        queryFn: () => ItemsApi.getItemById(itemId ?? ""),
        enabled: !!itemId
    })

    const toggleCategory = (category: string) => {
        changeSelectedCategory([category]);
        return true;
    }

    if (user?.id !== userId || item?.userId !== user?.id) {
        return <>
            <span>You can not edit item of another user!</span>
        </>
    }

    return <>
        {reason === null ?
            <>
                <h1>Edit item</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder={item?.name}
                            {...register("name")} />
                        {isSubmitted && errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder={item?.description}
                            {...register("description")} />
                        {isSubmitted && errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <button type="button" onClick={() => toggleShowCategories(!showCategories)} >Categories</button>
                    {showCategories && <CategoryFilter toggleCategory={toggleCategory} categories={categories} />}
                    <button className="green-button" type="submit">Edit item</button>
                </form>
            </> :
            reason === "OK" ?
                <h3>Item edited!</h3> :
                <>
                    <h3>Unable to create item.</h3>
                    <p>Reason: {reason}</p>
                </>}
        <NavLink to={`/users/${userId}`}>Back</NavLink>
    </>
}

export default ItemUpdate;