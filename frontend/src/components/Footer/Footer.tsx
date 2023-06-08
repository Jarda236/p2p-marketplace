import React, {FC} from "react";
import {NavLink} from "react-router-dom";

const Footer: FC = () => {
    return (
        <footer className="bg-sky-400 bottom-0 w-full">
            <div className="pt-2 pl-2 text-sm sm:text-base sm:pt-2 sm:pl-2 mx-auto w-full max-w-screen-xl">
                <div className="flex justify-left">
                    <div className="">
                        <NavLink to="/">
                            <img src="/icons/p2picon.png"
                            className="w-10 h-10 sm:h-10 sm:w-10 object-scale-down cursor-pointer"
                            alt="p2p-marketplace-logo" />  
                        </NavLink>
                    </div>
                    <div className="ml-2 sm:ml-4 flex text-black self-center">
                        <div className="self-center">Authors:</div>
                        <a href="https://is.muni.cz/auth/osoba/524640" className="hover:underline ml-2">Jaroslav Plšek</a>
                        <a href="https://is.muni.cz/auth/osoba/524865" className="hover:underline ml-2">Martin Macko</a>
                        <a href="https://is.muni.cz/auth/osoba/514615" className="hover:underline ml-2">Jan Straka</a>
                        <a href="https://is.muni.cz/auth/osoba/485159" className="hover:underline ml-2">Michael Škor</a>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-gray-700 w-11/12 mx-auto " />
            <div className="px-2 pb-2 text-xs sm:text-sm sm:px-4 sm:pb-4 pt-0">
                <span className="text-black">© 2023 <NavLink to="/"
                className=" hover:underline"
                >P2P Marketplace™</NavLink>. Project to PB138 at FI MU. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer;