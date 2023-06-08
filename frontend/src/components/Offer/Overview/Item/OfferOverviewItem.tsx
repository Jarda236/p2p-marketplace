import {FC} from "react";
import {Item, Offer, User} from "../../../../models";
import {NavLink, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../../../state/atoms";

interface OfferOverviewItemProps {
    offer: Offer,
    seller: User,
    item: Item | undefined
}
const OfferOverviewItem: FC<OfferOverviewItemProps> = ({offer, seller, item}) => {
    const navigate = useNavigate();
    const [user] = useRecoilState(userState);

    return (
    <div className="mx-2 my-4 sm:pb-2 sm:pr-2 sm:h-auto sm:m-8 md:pb-0 md:pr-0 bg-blue-100 hover:bg-blue-200 flex flex-wrap rounded-md justify-between transition-all shadow-lg shadow-gray-300 hover:shadow-xl overflow-hidden">
        <section className=" text-base sm:text-lg grid grid-cols-3 sm:flex sm:flex-row h-auto">
            <figure className="sticky">
                <img onClick={() => navigate("/offers/".concat(offer.id))} src={item?.image === "" ? "/pictures/auto.jpg" : item?.image}
                className=" w-fit h-32 sm:h-48 sm:w-48 object-cover rounded-md"
                alt={item?.name.concat("-image")} />
            </figure>
            <div className=" m-2 col-span-2">
                <p><b>{item?.name}</b></p>
                <p>{item?.category}</p>
                <p className=" text-sm sm:w-80 sm:text-base">{item?.description}</p>
                <p><b>{offer.price},-</b></p>
            </div>
        </section>
        <section className=" text-sm sm:text-base sm:mr-4 flex flex-col my-2 ml-2 justify-between">
            <span><b>Seller: </b>{seller.name}</span>
            <div className=" flex flex-row">
                <figure className=" mr-4">
                    <img onClick={() => navigate("/users/".concat(seller.id))} src={seller.image}
                    className=" h-12 w-12 object-cover rounded-full"
                    alt={seller.name.concat("-avatar")} />
                </figure>
                <span className=" font-medium">{seller.rating}</span>
                <figure className=" ml-1">
                    <img src="/pictures/star.png"
                    className=" h-5 w-5 object-cover"
                    alt="star" />
                </figure>
            </div>
            <NavLink to={"/users/".concat(seller.id)}
                className=" relative w-fit block after:block after:absolute after:bg-black hover:scale-x-100"
            >Profile</NavLink>
        </section>
        <section className=" ml-2 sm:grow lg:grow-0 sm:max-w-xs sm:mx-auto flex flex-col my-2 justify-between">
            <NavLink to={"/offers/".concat(offer.id)}
            className=" text-center text-xs sm:text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-blue-600 focus:ring-4 font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-blue-800" >
                Offer detail
            </NavLink>
            {offer.buyerId ?
                <span className=" text-red-500 font-bold text-xl text-center">SOLD</span> :
                user?.id === offer.userId ?
                    <NavLink to={`/offers/${offer.id}/counter-offers`}
                    className=" text-center text-xs sm:text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-blue-600 focus:ring-4 font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                        Counter-offers
                    </NavLink>:
                <>
                    <button
                        className=" text-xs sm:text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-green-600 focus:ring-4 font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-green-800"
                        type="button"
                        onClick={() => navigate(`${offer.id}/create-counter-offer`)}>
                            Counter-offer
                    </button>
                    <button
                        className={"text-xs sm:text-sm px-5 py-2.5 mr-2 mb-2 text-white focus:ring-4 font-medium rounded-lg  focus:outline-none ".concat((user?.fundsAccount.balance ?? 0) >= offer.price ? "bg-green-700 hover:bg-green-700 focus:ring-green-800" : " cursor-not-allowed bg-black")}
                        type="button"
                        onClick={() => (user?.fundsAccount.balance ?? 0) >= offer.price && navigate(`/offers/${offer.id}/buy`)}>Buy</button>
                </>
            }
        </section>
    </div>
    )
}

export default OfferOverviewItem;