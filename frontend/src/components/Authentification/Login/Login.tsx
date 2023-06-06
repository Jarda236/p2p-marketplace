import {FC, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string, ref} from "yup";
import { AuthApi } from "../../../services";

type LoginFormData = {
    username: string;
    password: string;
};

const schema = object().shape({
    username: string()
        .required("Username is required."),
    password: string()
        .required("Password is required.")
});
const Login: FC = () => {
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });

    const [success, setSuccess] = useState<boolean | null>(null);

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        await AuthApi.login(data.username, data.password)
            .then((response) => {
                setSuccess(true);
                //user.setUser(response.user);
                localStorage.setItem('token', response.token);
                navigate("/");
            })
            .catch(() => setSuccess(false));
    }

    return (
    <div className="  w-2/4 bg-slate-400 rounded-lg shadow shadow-slate-700 mx-auto p-4 my-4
                    flex flex-col space-y-4 max-w-sm">
        <h2 className=" text-xl font-bold leading-tight tracking-tight">
            Sign in to your account
        </h2>
        {!success &&
            <form action="#" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your login:</label>
                    <input type="text" {...register("username")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1" placeholder="username" />
                    {isSubmitted && errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password:</label>
                    <input type="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1"/>
                    {isSubmitted && errors.password && <span>{errors.password.message}</span>}
                </div>
                <button type="submit" className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-1.5">
                    Login
                </button>
                {success === false && <i>Bad credentials.</i>}
            </form>
        }
        <p>
            Don't have an account yet? <NavLink to="/auth/register" className=" font-bold text-black hover:underline">
                Register
            </NavLink>
        </p>
        <NavLink to="/" className=" font-bold text-black hover:underline">
            Back
        </NavLink>
    </div>
    );
}

export default Login;