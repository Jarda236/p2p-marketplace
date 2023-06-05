import {FC} from "react";
import {NavLink} from "react-router-dom";

const Login: FC = () => {
    return <>
        <h1>Login Page</h1>
        <NavLink to="/">Back</NavLink>
    </>
}

export default Login;