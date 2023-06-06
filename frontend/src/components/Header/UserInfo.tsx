import {FC, useEffect} from "react";
import {User} from "../../models";
import {NavLink} from "react-router-dom";
import {SetterOrUpdater, useRecoilState} from "recoil";
import {initialAuth} from "../../state/atoms";
import { AuthApi } from "../../services";

interface UserInfoProps {
    user?: User,
    setUser: SetterOrUpdater<User | undefined>
}
const UserInfo:FC<UserInfoProps> = ({user, setUser}) => {
    const handleLogout = () => {
        setUser(undefined);
        localStorage.removeItem('token');
    }

    return ( 
    <section>
        <section className=" flex flex-col pb-1">
            <div className="  justify-self-center">
                <img src="/icons/user.jpg"
                className=" h-12 w-12 object-cover rounded-full"
                alt={user ? user.username.concat("-avatar") : "guest-avatar"}/>
                <div className=" felx flex-col">
                    <div className=" pt-1">
                        <span
                        className=" text-base"
                        >{user ? user.username : "Guest"}</span>
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
            <span>Cash: {user ? user.account.balance : "Login to show."}</span>
        </section>
    </section>
    );
}

export default UserInfo;