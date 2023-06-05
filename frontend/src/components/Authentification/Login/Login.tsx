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

    return <div>
        <h2>Login</h2>
        {!success &&
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Username:</label>
                    <input type="text" {...register("username")} />
                    {isSubmitted && errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" {...register("password")} />
                    {isSubmitted && errors.password && <span>{errors.password.message}</span>}
                </div>
                <button className="green-button" type="submit">Login</button>
                {success === false && <i>Bad credentials.</i>}
            </form>}
        <NavLink to="/">Back</NavLink>
    </div>
}

export default Login;