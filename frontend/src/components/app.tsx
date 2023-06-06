import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import OfferDetail from "./Offer/Detail/OfferDetail";
import OfferOverview from "./Offer/Overview/OfferOverview";
import WelcomePage from "./WelcomePage";
import OfferCreate from "./Offer/Create/OfferCreate";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import UserOverview from "./User/Overview/UserOverview";
import UserDetail from "./User/Detail/UserDetail";
import Login from "./Authentification/Login/Login";
import Register from "./Authentification/Register/Register";
import {atom} from "recoil";
export const App: FC = () => {

    return (
        <div className=" min-h-screen flex flex-col m-0 p-0">
            <div>
                <Header />
            </div>
            <main className=" grow">
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/offers" element={<OfferOverview />} />
                    <Route path="/offers/:offerId" element={<OfferDetail />} />
                    <Route path="/offers/create" element={<OfferCreate />} />
                    <Route path="/users" element={<UserOverview />} />
                    <Route path="/users/:userId" element={<UserDetail />} />
                </Routes>
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
};