import { Link } from "react-router-dom";
import binWhite from "../assets/images/global/bin-white.svg";
import whatsAppLogoGreen from "../assets/images/global/whatsapp-product.png";
import DescriptionItem from "../components/DescriptionItem.jsx";
import Loader from "../components/Loader.jsx";
import useProductDetails from "../hooks/useProductDetails.jsx";
import { useContext, useState } from "react";
import { WishListContext } from "../context/WishListContext.jsx";

export default function ProductPage() {

    const [isOpen, setOpen] = useState(false);
    const { dispatchWishlist, wishListItems } = useContext(WishListContext)
    const { specsArr, curProduct, downloadInfo, isLoading, isPressed, addToCart } = useProductDetails();



    if (isLoading) {
        return (<Loader />)
    }

    if (!curProduct) {

        return (
            <main className="flex justify-center items-center grow container mx-auto max-w-330">
                <div className="flex flex-col text-center gap-2">
                    <h1 className="text-3xl">Такого товара нет!</h1>
                    <p className="text-2xl">Попробуйте позже</p>
                    <div className="flex gap-1">
                        <button onClick={() => downloadInfo()} className="p-2.5 cursor-pointer bg-[#6c757d] hover:bg-[#5c636a] px-3 py-1.5 rounded-md text-white" type="button">Повторить попытку</button>
                        <Link to="/" className="cursor-pointer bg-[#0d6efd] hover:bg-[#0b5ed7] px-3 py-1.5 rounded-md text-white">
                            На главную
                        </Link>
                    </div>
                </div>

            </main>
        )
    }

    const { title, alt, price, oldPrice, img, id: idProduct } = curProduct;

    const isLiked = wishListItems.some((itemId) => itemId === idProduct);
    return (
        <main className="relative container mx-auto flex flex-col grow max-w-330  px-2.5">
            <section className="flex flex-col rounded-4xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] p-4 bg-white">
                <svg
                    onClick={() => dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: { id: idProduct } })}
                    className="heart-icon like-btn block cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90 select-none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "#1C1C27" : "none"}
                    stroke={isLiked ? "none" : "#1C1C27"}
                    strokeWidth={isLiked ? "0" : "2"}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
                <div className="flex justify-center my-4">
                    <img className="max-h-62.5 object-contain w-full max-w-[320px] select-none" src={`/images/${img}`} alt={alt} />
                </div>
                <div className="flex justify-between items-centers mt-auto">
                    <h6 className="font-bold m-0 text-[clamp(12px,3vw,16px)] leading-none">{title}</h6>

                    <div className="flex flex-col text-right gap-1">
                        <span className="font-bold leading-none text-[clamp(12px,3vw,16px)] text-[rgba(255,165,66,1)]">{price}</span>
                        {oldPrice && <small className="font-bold leading-none text-[clamp(10px, 2.8vw, 14px)] text-[rgba(255,206,127,1)] line-through">{oldPrice}</small>}
                    </div>
                </div>
            </section>

            <section className="relative flex flex-col my-6 bg-white shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] rounded-2xl">
                <div onClick={() => setOpen((prev) => !prev)} className="flex justify-between p-4 rounded-2xl shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)]">
                    <h6 className="font-bold">Описание и характеристики</h6>
                    <button className={`bg-transparent transition-transform duration-300 ${(isOpen) ? "rotate-180" : ""}  inline-block`}>▾</button>
                </div>
                <div className={`grid transition-[grid-template-rows] ease-in-out duration-300 ${(isOpen) ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}  overflow-hidden`}>
                    <div className="overflow-hidden">
                        <ul className="p-4">
                            {specsArr.map((item, index) => <DescriptionItem key={item.id || index} arr={item} />)}
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between gap-2">
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            addToCart(idProduct);
                        }}
                        type="button"
                        className="bg-[rgba(16,16,16,1)] text-white block rounded-2xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] p-4 self-center border-0 transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        <img className="w-5.5 h-5.25" src={binWhite} alt="Избранное" />
                    </button>
                    <Link className="block no-underline shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] grow-2 bg-[rgba(16,16,16,1)] text-white p-4 self-center text-center border-0 rounded-2xl">Купить сейчас</Link>
                    <button
                        className="bg-[rgba(16,16,16,1)] text-white block rounded-2xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] p-4 self-center border-0 transition-transform duration-200 hover:scale-105 active:scale-95"
                        type="button"
                    >
                        <img className="w-5.5 h-5.25" src={whatsAppLogoGreen} alt="WhatsApp" />
                    </button>
                </div>


            </section>
            <div className={`absolute left-[50%]  transition-transform duration-500 ${(isPressed) ? "translate-y-0" : "translate-y-[-400%]"}  -translate-x-1/2 bg-white border border-black p-2 rounded-2xl`}>
                <p>✅ Товар успешно добавлен в корзину.</p>
            </div>

        </main>
    )
}