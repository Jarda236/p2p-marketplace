import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import Overview from "./Offer/Overview/Overview";
import WelcomePage from "./WelcomePage";

export const App: FC = () => {

    return (
        <>
            <div className="header"></div>
            <h1>P2P Marketplace</h1>
            <main>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/offers" element={<Overview />} />
                </Routes>
            </main>
        </>
    )
};