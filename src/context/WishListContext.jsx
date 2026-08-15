import { createContext, useContext, useEffect, useReducer } from "react"
// import { DataContext } from "./DataContext"

export const WishListContext = createContext(null);

import reducer from "../helpers/wishListReducer.js";
import getFromStorage from "../helpers/getFromStorage.js";

export default function WishListProvider({ children }) {


    const [wishListItems, dispatchWishlist] = useReducer(reducer, [], () => getFromStorage("wishList"));

    useEffect(() => {
        const jsonReady = JSON.stringify(wishListItems);

        localStorage.setItem("wishList", jsonReady);

    }, [wishListItems]);

    return (
        <WishListContext.Provider value={{ dispatchWishlist, wishListItems }}>
            {children}
        </WishListContext.Provider>
    )

}