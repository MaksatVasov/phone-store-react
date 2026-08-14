import { useContext, useState } from "react";
import binIcon from "../assets/images/global/bin.svg";
import wishListIcon from "../assets/images/global/heart-deskt.svg";

import { phoneCatalog } from "../data/phoneCatalog/phonesCatalog";
import DropDownItem from "./DropDownItem";
import { Link } from "react-router-dom";
import { WishListContext } from "./WishListContext";
import { CartContext } from "./CartContext";
import { UIContext } from "./UIContext";

export default function Header() {

    const [isListOpened, setList] = useState({ isOpened: false, btnWidth: 0, top: 0, left: 0 });
    const { wishListItems } = useContext(WishListContext);
    const { cart } = useContext(CartContext);

    const { sidebar, setSidebar } = useContext(UIContext);

    return (
        <header className="bg-[rgba(234,234,234,1)] sticky top-0 z-1000 mb-2 max-h-25">
            <nav className="flex justify-between items-center container max-w-330 mx-auto px-6 py-2.5">

                <div className="flex gap-6 items-center">
                    <span className="flex items-center text-[2.5rem] font-bold">
                        <Link to="/" className="font-montserrat no-underline text-black">Qpick</Link>
                    </span>

                    <div className="relative hidden lg:block">
                        <button onClick={(event) => {
                            const btnWidth = event.target.offsetWidth + "px";
                            const btnHeight = event.target.offsetHeight + "px";

                            const parentLeft = event.target.offsetLeft + "px";
                            const parentTop = event.target.offsetTop + event.target.offsetHeight + "px";

                            setList((prev) => ({
                                ...prev,
                                isOpened: !prev.isOpened,
                                btnWidth: btnWidth,
                                btnHeight: btnHeight,
                                top: parentTop,
                                left: parentLeft
                            }));
                        }}
                            className={`flex items-center gap-1 text-[1rem] after:transition-transform after:duration-200 after:content-[''] after:inline-block after:w-2 after:h-1 after:bg-menu-arrow ${isListOpened.isOpened ? "after:rotate-180" : "after:rotate-0"}`} type="button">
                            Выбрать модель телефона
                        </button>

                        {isListOpened.isOpened &&
                            <ul style={{ top: isListOpened.top, left: isListOpened.left, width: isListOpened.btnWidth }} className="absolute bg-white border rounded-md border-[rgba(0,0,0,0.175)] py-1 px-4 shadow-md">
                                {phoneCatalog.map((item) => <DropDownItem key={item.brand} phone={item} />)}
                            </ul>
                        }
                    </div>
                </div>

                <div className="flex gap-6 justify-between items-center">
                    <div className="relative">
                        <input className="hidden sm:inline-block p-0.5 shadow-md text-base shadow-[rgba(0,0,0,0.07)] border border-[#b6b1b1] border-solid w-62.5 bg-[rgb(245,241,241)]" type="text" placeholder="Поиск товара..." />
                        <div id="searchResults" className="hidden"></div>
                    </div>

                    <Link to="/wishlist" className="relative hidden lg:inline-block hover:scale-105 active:shadow-[0_0_3px_rgba(0,0,0,0.15)] select-none">
                        <img src={wishListIcon} alt="wishlist" />
                        <span className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FFC107] text-white font-bold text-[0.75em] py-[0.35em] px-[0.65em] rounded-full ${(wishListItems.length) ? "" : "hidden"}`}>
                            {wishListItems.length}
                        </span>
                    </Link>

                    <Link to="/cart" className="relative hover:scale-105 active:shadow-[0_0_3px_rgba(0,0,0,0.15)] select-none">
                        <img src={binIcon} alt="bin" />
                        <span id="bin-badge" className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FFC107] text-white font-bold text-[0.75em] py-[0.35em] px-[0.65em] rounded-full ${cart.length ? "" : "hidden"}`}>
                            {cart.length}
                        </span>
                    </Link>

                    <button
                        onClick={() => setSidebar((prev) => !prev)}
                        id="burger-btn"
                        className="lg:hidden p-2 rounded-md shadow group transition-all duration-200 ease-out hover:bg-gray-100 hover:shadow-md active:scale-90 active:bg-gray-200 active:shadow-inner"
                        type="button"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-gray-900 group-active:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 5h22 M4 15h22 M4 25h22" />
                        </svg>
                    </button>
                </div>

            </nav>
        </header>
    )
}