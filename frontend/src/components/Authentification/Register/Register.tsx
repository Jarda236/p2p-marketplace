import {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {object, ref, string} from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { AuthApi } from "../../../services";

type RegisterFormData = {
    username: string;
    password: string;
    passwordRepeat: string;
};

type RegistrationRequest = {
    username: string;
    password: string;
};

const schema = object().shape({
    username: string()
        .required("Username is required."),
    password: string()
        .required("Password is required."),
    passwordRepeat: string()
        .oneOf([ref('password')], 'Passwords must match.')
        .required('Password confirmation is required.')
});

const Register: FC = () => {
    const navigate = useNavigate();

    const [success, changeSuccess] = useState<boolean | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<RegisterFormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        await AuthApi.register(data.username, data.password)
            .then(() => {
                navigate("/auth/login");
            })
            .catch(() => changeSuccess(false));
    }

    return (
        <div className="  w-2/4 bg-slate-400 rounded-lg shadow shadow-slate-700 mx-auto p-4 my-4
        flex flex-col space-y-4 max-w-sm">
        <h2 className=" text-xl font-bold leading-tight tracking-tight" >
            Register account
        </h2>
        {success ?
            <h3>Úspešne ste sa zaregistrovali!</h3> :
            <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username:</label>
                    <input type="text" {...register("username")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                    {isSubmitted && errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    TODO
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email:</label>
                    <input type="email" placeholder="john@gmail.com"        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                </div>
                <div>
                    TODO
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone number:</label>
                    <input type="number" placeholder="123123123"          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                </div>
                <div>
                    TODO
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City:</label>
                    <input type="text"          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:</label>
                    <input type="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                    {isSubmitted && errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900">Repeat password:</label>
                    <input type="password" {...register("passwordRepeat")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1" />
                    {isSubmitted && errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
                </div>
                <button type="submit" className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1.5">
                    Register
                </button>
                {success === false && <i>Username is taken.</i>}
            </form>}
        <NavLink to="/" className=" font-bold text-black hover:underline">
            Back
        </NavLink>
    </div>
    );
}

export default Register;