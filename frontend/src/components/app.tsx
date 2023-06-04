import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import OfferDetail from "./Offer/Detail/OfferDetail";
import OfferOverview from "./Offer/Overview/OfferOverview";
import WelcomePage from "./WelcomePage";

export const App: FC = () => {

    return (
        <>
            <div className="header"></div>
            <h1>P2P Marketplace</h1>
            <main>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/offers" element={<OfferOverview />} />
                    <Route path="/offers/:offerId" element={<OfferDetail />} />
                </Routes>
            </main>
        </>
    )
};