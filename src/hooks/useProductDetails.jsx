import { useContext, useMemo, useRef, useState } from "react";
import { DataContext } from "../components/DataContext";
import { UIContext } from "../components/UIContext";
import { CartContext } from "../components/CartContext.jsx";
import { useParams } from "react-router-dom";

export default function useProductDetails() {

    const { products, downloadInfo, isLoading } = useContext(DataContext);
    const { dispatchCart } = useContext(CartContext);

    const { id } = useParams();


    const curProduct = useMemo(() => {
        if (!products) return null;
        return products.find((item) => item.id === id);
    }, [products, id]);

    const specsArr = useMemo(() => {

        if (!products) return null;

        if (curProduct?.specs) {
            return Object.entries(curProduct.specs);
        }

        return [];

    }, [curProduct]);

    const [isPressed, setPress] = useState(false);

    const isLocked = useRef(false); 

    function addToCart(idProduct){

        if(isLocked.current) return;

        dispatchCart({ type: "ADD_TO_CART", payload: { id: idProduct } });
        setPress(true);
        isLocked.current = true;

        setTimeout(() => {
            setPress(false);
            isLocked.current = false;
        }, 3000);
    }


    return { specsArr, curProduct, downloadInfo, isLoading, isPressed, isLocked, addToCart }

}