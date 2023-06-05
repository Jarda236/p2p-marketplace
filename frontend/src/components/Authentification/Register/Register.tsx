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

    return <>
        <h1>Register Page</h1>
        {success ?
            <h3>Úspešne ste sa zaregistrovali!</h3> :
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" {...register("username")} />
                    {isSubmitted && errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" {...register("password")} />
                    {isSubmitted && errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="passwordRepeat">Repeat password:</label>
                    <input type="password" {...register("passwordRepeat")} />
                    {isSubmitted && errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
                </div>
                <button type="submit">Register</button>
                {success === false && <i>Username is taken.</i>}
            </form>}
        <NavLink to="/">Back</NavLink>
    </>
}

export default Register;