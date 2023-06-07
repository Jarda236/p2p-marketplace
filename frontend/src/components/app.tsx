import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import OfferDetails from "./Offer/Details/OfferDetails";
import OfferOverview from "./Offer/Overview/OfferOverview";
import WelcomePage from "./WelcomePage";
import OfferCreate from "./Offer/Create/OfferCreate";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import UserOverview from "./User/Overview/UserOverview";
import UserDetails from "./User/Details/UserDetails";
import Login from "./Authentification/Login/Login";
import Register from "./Authentification/Register/Register";
import {atom, useRecoilState} from "recoil";
import {userState} from "../state/atoms";
import NotFound from "./NotFound";
import CounterOfferCreate from "./CounterOffer/Create/CounterOfferCreate";
import OfferUpdate from "./Offer/Edit/OfferUpdate";
import OfferDelete from "./Offer/Delete/OfferDelete";
import CounterOfferOverview from "./CounterOffer/Overview/CounterOfferOverview";
import CounterOfferDetails from "./CounterOffer/Details/CounterOfferDetails";
import OfferBuy from "./Offer/Buy/OfferBuy";
import ItemCreate from "./Item/Create/ItemCreate";
export const App: FC = () => {
    const [user, setUser] = useRecoilState(userState);

    return (
        <div className=" min-h-screen flex flex-col m-0 p-0">
            <div>
                <Header />
            </div>
            <main className=" grow">
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/offers" element={<OfferOverview />} />
                    {user ?
                        <>
                            <Route path="/offers/:offerId" element={<OfferDetails />} />
                            <Route path="/offers/:offerId/buy" element={<OfferBuy />} />
                            <Route path="/offers/create" element={<OfferCreate />} />
                            <Route path="/offers/:offerId/edit" element={<OfferUpdate />} />
                            <Route path="/offers/:offerId/delete" element={<OfferDelete />} />
                            <Route path="/offers/:offerId/counter-offers" element={<CounterOfferOverview />} />
                            <Route path="/offers/:offerId/counter-offers/:counterId" element={<CounterOfferDetails />} />
                            <Route path="/users" element={<UserOverview />} />
                            <Route path="/users/:userId" element={<UserDetails />} />
                            <Route path="/users/:userId/create-item" element={<ItemCreate />} />
                            <Route path="/offers/:offerId/create-counter-offer" element={<CounterOfferCreate />} />
                            <Route path="/auth/login" element={<OfferOverview />} />
                            <Route path="/auth/register" element={<OfferOverview />} />
                        </>:
                        <>
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/register" element={<Register />} />
                            <Route path="*" element={<Login />}/>
                        </>
                    }
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
};