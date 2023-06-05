import {FC} from "react";
import {User} from "../../models";
import {NavLink} from "react-router-dom";

interface UserInfoProps {
    user?: User
}
const UserInfo:FC<UserInfoProps> = ({user}) => {
    return <section>
        <section>
            <span>User:</span>
            <div>
                <img src="" alt={user ? user.name.concat("-avatar") : "guest-avatar"}/>
                <div>
                    <span>{user ? user.name : "Guest"}</span>
                    {user ? <button type="button">Logout</button> : <NavLink to="/auth/login">Login</NavLink>}
                </div>
            </div>
        </section>
        <hr />
        <section>
            <span>Cash: {user ? user.cashAmount : "Login to show."}</span>
        </section>
    </section>
}

export default UserInfo;