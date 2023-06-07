import React, {FC} from "react";
import {NavLink} from "react-router-dom";

const Footer: FC = () => {
    return (
        <footer className="bg-sky-400 bottom-0 w-full">
            <div className="mx-auto w-full max-w-screen-xl pt-4 pl-4">
                <div className="flex flex-row">
                    <div className="mb-4">
                        <NavLink to="/">
                            <img src="/icons/p2picon.png"
                            className=" h-10 w-210 object-cover rounded-md"
                            alt="p2p-marketplace-logo" />  
                        </NavLink>
                    </div>
                    <div className="flex text-black pl-4 self-center">
                        <div>Authors:</div>
                        <a href="https://is.muni.cz/auth/osoba/524640" className="hover:underline pl-2">Jaroslav Plšek</a>
                        <a href="https://is.muni.cz/auth/osoba/524865" className="hover:underline pl-2">Martin Macko</a>
                        <a href="https://is.muni.cz/auth/osoba/514615" className="hover:underline pl-2">Jan Straka</a>
                        <a href="https://is.muni.cz/auth/osoba/485159" className="hover:underline pl-2">Michael Škor</a>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-gray-700 w-11/12 mx-auto " />
            <div className="sm:flex sm:items-center sm:justify-between p-4 pt-0">
                <span className="text-sm text-black sm:text-cente">© 2023 <NavLink to="/"
                className=" hover:underline"
                >P2P Marketplace™</NavLink>. Project to PB138 at FI MU. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer;