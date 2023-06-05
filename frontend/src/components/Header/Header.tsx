import {FC} from "react";
import UserInfo from "./UserInfo";

const Header:FC = () => {
    return <>
        <figure>
            <img src="" alt="p2p-marketplace-logo" />
            <figcaption>
                <h1>P2P Marketplace</h1>
            </figcaption>
        </figure>
        <UserInfo />
    </>
}

export default Header;