import {FC} from "react";
import {User} from "../../models";
import {NavLink, useNavigate} from "react-router-dom";
import {SetterOrUpdater} from "recoil";

interface UserInfoProps {
    user?: User,
    setUser: SetterOrUpdater<User | undefined>
}
const UserInfo:FC<UserInfoProps> = ({user, setUser}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(undefined);
        localStorage.removeItem('token');
    }

    return ( 
    <section>
        <section className=" flex flex-col">
            <div className="  justify-self-center">
                <NavLink to={user ? "/users/".concat(user.id) : "/auth/login"}>
                    <img src={user ? user.image : "/icons/user.jpg"}
                        onClick={() => user !== undefined && navigate("/users/".concat(user.id))}
                        className="h-0 w-0 sm:h-12 sm:w-12 object-cover rounded-full"
                        alt={user ? user.name.concat("-avatar") : "guest-avatar"}/>
                </NavLink>
                <div className=" flex flex-col">
                    <div className="">
                        <span
                        className=" text-xs sm:text-sm font-medium"
                        >{user ? user.name : "Guest"}</span>
                    </div>
                    <div>
                        {user ? <button
                                type="button"
                                className=" text-xs sm:text-sm px-10 text-center text-black bg-red-700 hover:bg-red-800 font-medium rounded-lg"
                                onClick={handleLogout}
                        >Logout</button> : 
                        <NavLink to="/auth/login"
                        className="text-xs sm:text-sm px-10 text-center text-black bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg"
                        >Login</NavLink>}
                    </div>
                </div>
            </div>
        </section>
        <hr className="my-1 h-px bg-gray-700 border-0"  />
        <section className="text-xs sm:text-sm font-medium">
            <span>Cash: {user ? user.fundsAccount.balance : "Login to show."}</span>
        </section>
    </section>
    );
}

export default UserInfo;