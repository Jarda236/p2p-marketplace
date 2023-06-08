import {FC, useEffect} from "react";
import UserInfo from "./UserInfo";
import {useRecoilState} from "recoil";
import {userState, initialAuth} from "../../state/atoms";
import { AuthApi } from "../../services";
import {NavLink, useNavigate} from "react-router-dom";

const Header:FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const [auth, setAuth] = useRecoilState(initialAuth);

    const runInitialAuth = async () => {
        if (user === undefined && !auth) {
            setAuth(true);
            await AuthApi.isAuthenticated()
                .then(r => setUser(r))
                .catch();
        }
    }

    useEffect(() => {
        runInitialAuth();
    })

    return ( 
    <div className="p-2 sm:px-4 sm:py-2 lg:py-4 bg-sky-400 flex flex-row justify-stretch shadow shadow-slate-400">
        <NavLink to="/" className="grow my-2 mt-2">
            <figure className=" flex flex-row" onClick={() => navigate("/")}>
                <img src="/icons/p2picon.png"
                className=" h-10 w-10 sm:w-24 sm:h-24 object-scale-down cursor-pointer"
                alt="p2p-marketplace-logo" />
                <figcaption className="ml-1 text-xs sm:text-base self-center font-bold font-sans cursor-pointer">
                    <h1 className=" text-sm sm:text-lg font-bold">P2P Marketplace</h1>
                    Trade everything with everyone
                </figcaption>
            </figure>
        </NavLink>
        <div className="">
            <UserInfo user={user} setUser={setUser}/>
        </div>
    </div>
    );
}

export default Header;