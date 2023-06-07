import {FC, useEffect} from "react";
import UserInfo from "./UserInfo";
import {useRecoilState} from "recoil";
import {userState, initialAuth} from "../../state/atoms";
import { AuthApi } from "../../services";
import {useNavigate} from "react-router-dom";

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
    <div className="  bg-sky-400 flex flex-row justify-stretch shadow shadow-slate-400">
        <figure className=" grow flex flex-row p-4" onClick={() => navigate("/")}>
            <img src="/icons/p2picon.png"
            className=" h-24 w-24 object-cover rounded-md cursor-pointer"
            alt="p2p-marketplace-logo" />
            <figcaption className=" self-center pl-4 font-bold font-sans cursor-pointer">
                <h1 className=" text-3xl font-bold">P2P Marketplace</h1>
                Trade everything with everyone
            </figcaption>
        </figure>
        <div className=" pr-4 pt-4 pb-2">
            <UserInfo user={user} setUser={setUser}/>
        </div>
    </div>
    );
}

export default Header;