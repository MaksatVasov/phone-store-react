
import { Link } from "react-router-dom";
import heartBig from "../assets/images/global/wish-list-heart-big.png";
import heartSmall from "../assets/images/global/wish-list-heart-small.png";

import { WishListContext } from "./WishListContext";
import { useContext } from "react";
import CatalogItem from "./CatalogItem";
import useWishListProducts from "../hooks/useWishListProducts";

export default function WishListPage() {


    const { dispatchWishlist, wishListItems } = useContext(WishListContext);

    const wishList = useWishListProducts();


    return (
        <main className="container mx-auto max-w-330 grow flex flex-col px-6">

            {wishList.length === 0 && <div className="flex flex-col items-center justify-center grow mb-8">
                <picture className="mb-4">
                    <source media="(min-width: 992px)" srcSet={heartBig} />
                    <source media="(min-width: 420px)" srcSet={heartSmall} />
                    <img
                        className="w-full max-w-37.5 object-contain"
                        src={heartSmall}
                        alt="Здесь пока пусто..."
                    />
                </picture>

                <h2 className="text-2xl font-bold text-[#101010] mb-2">
                    Здесь пока пусто...
                </h2>

                <small className="text-center text-gray-500 leading-tight mb-6 text-base">
                    Добавьте товары в Избранное, <br />и вы всегда сможете найти их здесь
                </small>

                <Link to="/" className="bg-[#101010] text-white no-underline shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] rounded-3xl px-12 py-4 font-bold transition-opacity hover:opacity-85 block text-center">
                    В каталог товаров
                </Link>
            </div>}




            {wishList.length !== 0 && <div className="flex flex-col grow py-4">
                <h2 className="text-[rgba(131,131,131,1)] text-2xl font-semibold mb-6">
                    Избранное
                </h2>


                <div className="flex flex-nowrap lg:flex-wrap overflow-auto gap-6 p-3.5">
                    {wishList.map((item) => <CatalogItem key={item.id} item={item} />)}
                </div>
            </div>}


        </main>
    );

}