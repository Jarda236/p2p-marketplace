import {ChangeEvent, FC, useState} from "react";
import {object, string} from "yup";
import {NavLink, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../state/atoms";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CategoriesApi, ImagesApi, ItemsApi} from "../../../services";
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
    const [image, setImage] = useState<{preview: string, data: File}>();
    const [user] = useRecoilState(userState);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<UpdateItemFormData>({
        resolver: yupResolver(ItemUpdateSchema)
    });

    const onSubmit: SubmitHandler<UpdateItemFormData> = async (data) => {
        if (selectedCategory.length === 0) {
            setReason("You have to check one category.");
            return;
        }
        if (image){
            await ImagesApi.postImage(image.data)
                .then(async (response) => await ItemsApi.updateItem({
                    userId: user?.id ?? "",
                    name: data.name,
                    description: data.description,
                    image: response,
                    category: selectedCategory[0],
                    blocked: false
                }).then(() => {
                    setReason("OK");
                })
                    .catch((reason) => setReason(reason.message)))
                .catch((reason) => setReason(reason.message))
        } else {
            await ItemsApi.updateItem({
                userId: user?.id ?? "",
                name: data.name,
                description: data.description,
                image: "dsad",
                category: selectedCategory[0],
                blocked: false
            }).then(() => {
                setReason("OK");
            })
                .catch((reason) => setReason(reason.message))
        }
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

    const returnError = (text: string) => {
        return <div className="mt-4 mx-10 bg-red-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
            <span>{text}</span>
        </div>
    }

    if (user?.id !== userId || item?.userId !== user?.id) {
        return returnError("You can not edit item of another user!");
    }

    if (item?.blocked) {
        return returnError("Item is blocked!");
    }

    return <>
        {reason === null ?
            <div className=" bg-slate-400 rounded-lg shadow shadow-slate-700 mx-auto p-4 my-4
            flex flex-col space-y-4 max-w-md">
                <h1 className=" text-xl font-bold leading-tight tracking-tight">
                    Edit item
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}
                    className="  text-base font-medium text-black flex flex-col">
                    <div className="mb-2">
                        <label htmlFor="name" className="block ">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder={item?.name}
                            {...register("name")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"
                            />
                        {isSubmitted && errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="description" className="block">Description:</label>
                        <textarea
                            id="description"
                            placeholder={item?.description}
                            {...register("description")}
                            className=" w-full h-28"/>
                        {isSubmitted && errors.description && <span>{errors.description.message}</span>}
                    </div>

                    <div className="mb-2 flex flex-col">
                        <button type="button"
                        onClick={() => toggleShowCategories(!showCategories)}
                        className="w-1/2 text-black hover:underline hover:bg-slate-500 rounded-lg">
                            Categories ᐯ
                        </button>
                        {showCategories && <CategoryFilter selectedCategories={selectedCategory} toggleCategory={toggleCategory} categories={categories} />}
                    </div>

                    <div className="flex flex-col">
                        <span className="mb-2">Choose image:</span>
                        <input type="file" accept="image/png" onChange={onImageChange}/>
                        <figure className="my-2">
                            <figcaption>Uploaded image:</figcaption>
                            {image?.preview && <img src={image.preview}
                            alt="image-preview"
                            className="w-1/2 h-1/2"/>}
                        </figure>
                    </div>

                    <button type="submit"
                            className=" w-full center mx-auto text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5">
                            Edit item
                    </button>
                </form>
            </div> :
            reason === "OK" ?
                <div className="mt-4 mx-10 bg-green-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Item edited!</h3>
                </div> :
                <div className="mt-4 mx-10 bg-red-400 rounded-lg px-2 py-2 shadow-lg shadow-gray-300">
                    <h3>Unable to create item.</h3>
                    <p>Reason: {reason}</p>
                </div>}

        <div className=" ml-10 my-5">
            <NavLink to={`/users/${userId}`}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5">
                Back
            </NavLink>
        </div>
    </>
}

export default ItemUpdate;