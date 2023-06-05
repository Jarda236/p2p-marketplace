import {FC} from "react";
import {NavLink} from "react-router-dom";

const WelcomePage: FC = () => {
    return <>
        <h1>Welcome</h1>
        <NavLink to="offers">Offers overview</NavLink>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">Register</NavLink>
    </>
}

export default WelcomePage;