import {ChangeEvent, FC, useState} from "react";
import {object, string} from "yup";
import {NavLink, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {CategoriesApi, ImagesApi, ItemsApi} from "../../../services";
import {useQuery} from "@tanstack/react-query";
import CategoryFilter from "../../Offer/Overview/Filters/CategoryFilter";

interface CreateItemFormData {
    name: string,
    description: string
}

const ItemCreateSchema = object().shape({
    name: string().required("Name is required.").max(20, "Max 20 characters"),
    description: string().required("Description is required.").max(500, "Max 500 characters.")
});


const ItemCreate: FC = () => {
    const [reason, setReason] = useState<string | null>(null);
    const [showCategories, toggleShowCategories] = useState<boolean>(false);
    const [selectedCategory, changeSelectedCategory] = useState<string[]>([]);
    const {userId} = useParams();
    const [user] = useRecoilState(userState);
    const [image, setImage] = useState<{preview: string, data: File}>();

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<CreateItemFormData>({
        resolver: yupResolver(ItemCreateSchema)
    });

    const onSubmit: SubmitHandler<CreateItemFormData> = async (data) => {
        if (selectedCategory.length === 0) {
            setReason("You have to check one category.");
        }
        if (image){
            await ImagesApi.postImage(image.data)
                .then(async (response) => await ItemsApi.createItem({
                    name: data.name,
                    description: data.description,
                    image: response,
                    category: selectedCategory[0]
                }).then(() => {
                setReason("OK");
                })
                    .catch((reason) => setReason(reason.message)))
                .catch((reason) => setReason(reason.message))
        } else {
            await ItemsApi.createItem({
                name: data.name,
                description: data.description,
                image: "",
                category: selectedCategory[0]
            }).then(() => {
                setReason("OK");
            })
                .catch((reason) => setReason(reason.message))
        }
    }

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoriesApi.getCategories()
    })

    const toggleCategory = (category: string) => {
        changeSelectedCategory([category]);
        return true;
    }

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        new FileReader();
        if (e.target.files){
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0]
            })
        }
    }

    if (user?.id !== userId) {
        return <>
            <span>You can not create item for another user!</span>
        </>
    }

    return <>
        {reason === null ?
            <>
                <h1>Create Item</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name of item"
                            {...register("name")} />
                        {isSubmitted && errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            placeholder="Description of item"
                            {...register("description")} />
                        {isSubmitted && errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <button type="button" onClick={() => toggleShowCategories(!showCategories)} >Categories</button>
                    {showCategories && <CategoryFilter selectedCategories={selectedCategory} toggleCategory={toggleCategory} categories={categories} />}
                    <input type="file" accept="image/png" onChange={onImageChange}/>
                    <figure>
                        <figcaption>Uploaded image:</figcaption>
                        {image?.preview && <img src={image.preview} alt="image-preview" />}
                    </figure>
                    <button className="green-button" type="submit">Create item</button>
                </form>
            </> :
            reason === "OK" ?
                <h3>Item created!</h3> :
                <>
                    <h3>Unable to create item.</h3>
                    <p>Reason: {reason}</p>
                </>}
        <NavLink to={`/users/${userId}`}>Back</NavLink>
    </>
}

export default ItemCreate;