import { useContext, useEffect, useState } from "react";
import binIcon from "../assets/images/global/bin.svg";
import wishListIcon from "../assets/images/global/heart-deskt.svg";

import { phoneCatalog } from "../data/phoneCatalog/phonesCatalog";
import DropDownItem from "./DropDownItem";
import { Link } from "react-router-dom";
import { WishListContext } from "../context/WishListContext";
import { CartContext } from "../context/CartContext";
import { UIContext } from "../context/UIContext";
import { DataContext } from "../context/DataContext";

import SearchItem from "./SearchItem";


import useTypewriter from "../hooks/useTypeWriter"

export default function Header() {
    const [isListOpened, setListOpened] = useState(false);
    const [searchInput, setSearch] = useState("");
    const [searchedProducts, setSearchProducts] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const { wishListItems } = useContext(WishListContext);
    const { cart } = useContext(CartContext);
    const { sidebar, setSidebar } = useContext(UIContext);
    const { products } = useContext(DataContext);

    
    const searchPlaceholders = [
        "iPhone 15 Pro Max",
        "Samsung Galaxy S24",
        "AirPods Pro",
        "Apple Watch",
        "Чехол для телефона"
    ];

    
    const animatedPlaceholder = useTypewriter(searchPlaceholders);

    useEffect(() => {
        
        const timerId = setTimeout(() => {
            if (products && searchInput.trim() !== "") {
                setSearchProducts(
                    products.filter((item) => 
                        item.title.trim().toLowerCase().includes(searchInput.trim().toLowerCase())
                    )
                );
            } else {
                setSearchProducts([]);
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [searchInput, products]); 

    return (
        <header className="bg-[rgba(234,234,234,1)] sticky top-0 z-1000 mb-2 max-h-25">
            <nav className="flex justify-between items-center container max-w-330 mx-auto px-6 py-2.5">
                <div className="flex gap-6 items-center">
                    <span className="flex items-center text-[2.5rem] font-bold">
                        <Link to="/" className="font-montserrat no-underline text-black">Qpick</Link>
                    </span>

                    <div className="relative hidden lg:block">
                        <button
                            onClick={() => setListOpened((prev) => !prev)}
                            className={`flex items-center gap-1 text-[1rem] after:transition-transform after:duration-200 after:content-[''] after:inline-block after:w-2 after:h-1 after:bg-menu-arrow ${isListOpened ? "after:rotate-180" : "after:rotate-0"}`}
                            type="button"
                        >
                            Выбрать модель телефона
                        </button>

                        {isListOpened && (
                            <ul className="absolute top-full left-0 w-full mt-2 bg-white border rounded-md border-[rgba(0,0,0,0.175)] py-1 px-4 shadow-md z-50">
                                {phoneCatalog.map((item) => (
                                    <DropDownItem key={item.brand} phone={item} />
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex gap-6 justify-between items-center">
                    <div className="relative">
                        <input 
                            value={searchInput} 
                            onChange={(e) => setSearch(e.target.value)} 
                            onFocus={() => setIsFocused(true)} 
                            onBlur={() => setIsFocused(false)} 
                            className="hidden sm:inline-block p-0.5 shadow-md text-base shadow-[rgba(0,0,0,0.07)] border border-[#b6b1b1] border-solid w-62.5 bg-[rgb(245,241,241)]" 
                            type="text" 
                            placeholder={`${animatedPlaceholder}|`} 
                        />
                        <div 
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setIsFocused(false);
                                setSearch(""); 
                            }}
                            className={`${(isFocused && searchInput.trim().length > 0) ? "block" : "hidden"} w-full absolute top-full bg-[rgba(234,234,234,0.9)] border border-[rgba(194,189,189,0.9)] border-t-0 max-h-100 overflow-y-auto`}
                        >
                            {searchedProducts.length ? searchedProducts.map((item) => <SearchItem key={item.id} item={item} />) : <div className="p-2 text-gray-500">Поиск не дал результатов</div>}
                        </div>
                    </div>

                    <Link to="/wishlist" className="relative hidden lg:inline-block hover:scale-105 active:shadow-[0_0_3px_rgba(0,0,0,0.15)] select-none">
                        <img src={wishListIcon} alt="wishlist" />
                        <span className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FFC107] text-white font-bold text-[0.75em] py-[0.35em] px-[0.65em] rounded-full ${wishListItems.length ? "" : "hidden"}`}>
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
                        <svg className="w-6 h-6 text-gray-600 transition-colors duration-200 group-hover:text-gray-900 group-active:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                            <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 5h22 M4 15h22 M4 25h22" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}