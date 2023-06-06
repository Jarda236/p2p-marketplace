import {FC} from "react";
import UserInfo from "./UserInfo";

const Header:FC = () => {
    return ( 
    <div className="  bg-sky-400 flex flex-row justify-stretch shadow shadow-slate-400">
        <figure className=" grow flex flex-row p-4">
            <img src="/icons/p2picon.png"
            className=" h-24 w-24 object-cover rounded-md"
            alt="p2p-marketplace-logo" />
            <figcaption className=" self-center pl-4 font-bold font-sans">
                <h1 className=" text-3xl font-bold">P2P Marketplace</h1>
                Trade everything with everyone
            </figcaption>
        </figure>
        <div className=" pr-4 pt-4 pb-2">
            <UserInfo />
        </div>
    </div>
    );
}

export default Header;