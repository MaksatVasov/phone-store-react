import { useContext, useMemo, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { CartContext } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";

export default function useProductDetails() {

    const { products, downloadInfo, isLoading } = useContext(DataContext);
    const { dispatchCart } = useContext(CartContext);
    const navigate = useNavigate();
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

    function addToCart(idProduct) {

        if (isLocked.current) return;

        dispatchCart({ type: "ADD_TO_CART", payload: { id: idProduct } });
        setPress(true);
        isLocked.current = true;

        setTimeout(() => {
            setPress(false);
            isLocked.current = false;
        }, 3000);
    }


    function handleBuyNow(e) {

        e.preventDefault();

        navigate("/order", {
            state: {
                buyNowItem: {
                    ...curProduct,
                    quantity: 1
                }
            }
        });


    }

    return { specsArr, curProduct, downloadInfo, isLoading, isPressed, isLocked, addToCart, handleBuyNow }

}