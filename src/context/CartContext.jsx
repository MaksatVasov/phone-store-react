import { createContext, useEffect, useReducer, useState } from "react"

import cartReducer from "../helpers/cartReducer";
import getFromStorage from "../helpers/getFromStorage";
export const CartContext = createContext(null);

export default function CartProvider({ children }) {


    const [cart, dispatchCart] = useReducer(cartReducer, [], () => getFromStorage("cart"));

    const [isDelivery, setDelivery] = useState(false);

    useEffect(() => {
        const jsonReady = JSON.stringify(cart);

        localStorage.setItem("cart", jsonReady);

    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatchCart, isDelivery, setDelivery }}>
            {children}
        </CartContext.Provider>
    )

}