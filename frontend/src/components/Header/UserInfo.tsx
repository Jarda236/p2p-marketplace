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
        <section className=" flex flex-col pb-1">
            <div className="  justify-self-center">
                <img src={user ? user.image : "/icons/user.jpg"}
                     onClick={() => user !== undefined && navigate("/users/".concat(user.id))}
                     className=" h-12 w-12 object-cover rounded-full"
                     alt={user ? user.name.concat("-avatar") : "guest-avatar"}/>
                <div className=" felx flex-col">
                    <div className=" pt-1">
                        <span
                        className=" text-base"
                        >{user ? user.name : "Guest"}</span>
                    </div>
                    <div>
                        {user ? <button
                                type="button"
                                className="text-black bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-14 py-0"
                                onClick={handleLogout}
                        >Logout</button> : 
                        <NavLink to="/auth/login"
                        className=" text-black bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-14 py-0"
                        >Login</NavLink>}
                    </div>
                </div>
            </div>
        </section>
        <hr className="h-px bg-gray-700 border-0"  />
        <section className=" font-medium text-base">
            <span>Cash: {user ? user.fundsAccount.balance : "Login to show."}</span>
        </section>
    </section>
    );
}

export default UserInfo;