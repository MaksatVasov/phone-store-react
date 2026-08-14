import ratingStar from "../assets/images/global/star-card.png";
import { Link } from "react-router-dom";
import { WishListContext } from "./WishListContext";
import { useContext } from "react";

export default function CatalogItem({ item }) {
    
    const { title, rating, price, oldPrice, img, alt, id } = item;
    const { dispatchWishlist, wishListItems } = useContext(WishListContext);

    const isLiked = wishListItems.some((itemId) => itemId === id);

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: { id } });
    };

    return (
        <div className="relative basis-[58%] lg:basis-[33%] grow lg:grow-0 shrink-0 p-1.5 transition-transform duration-100 hover:scale-[1.02]">
            <div className="flex flex-col bg-white rounded-4xl p-4 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)]">

                {/* Аккуратное и чистое сердечко с динамическими атрибутами */}
                <div className="flex justify-start">
                    <svg
                        onClick={handleToggleWishlist}
                        className="z-25 heart-icon like-btn cursor-pointer transition-transform hover:scale-110"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "#1C1C27" : "none"}
                        stroke={isLiked ? "none" : "#1C1C27"}
                        strokeWidth={isLiked ? "0" : "2"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>

                <img className="self-center max-w-54.75 max-h-59.25 min-h-59.25 object-contain w-full mb-12" src={`/images/${img}`} alt={alt} />

                <div className="flex justify-between gap-0.5 mb-2">
                    <h6 className="font-bold leading-none text-[clamp(12px,3vw,16px)]">{title}</h6>
                    <div className="flex flex-col min-h-10 shrink-0 items-end">
                        <span className="text-[rgba(255,165,66,1)] font-bold leading-none text-[clamp(12px,3vw,16px)]">{price}</span>
                        <small className="text-[rgba(255,165,66,1)] line-through">{oldPrice}</small>
                    </div>
                </div>

                <div className="flex items-center mt-auto gap-2">
                    <img className="max-w-5 max-h-4.25 w-full" src={ratingStar} alt="rating" />
                    <span className="font-semibold leading-none text-[clamp(12px,3vw,16px)]">{rating}</span>
                </div>
            </div>
            <Link className="absolute z-10 inset-0" to={`/product/${id}`}></Link>
        </div>
    );
}