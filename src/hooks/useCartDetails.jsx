import { DataContext } from "../components/DataContext";
import { CartContext } from "../components/CartContext";
import { useContext, useMemo } from "react";

export default function useCartDetails() {

    const { products, isLoading } = useContext(DataContext);
    const { cart } = useContext(CartContext);

    const productsMap = useMemo(() => {

        if (isLoading) return new Map();

        return new Map(products.map((item) => [item.id, item]));

    }, [products]);


    const sum = useMemo(() => {

        return cart.reduce((acc, curr) => {

            const isFound = productsMap.get(curr.id);

            if (!isFound) return acc;

            const price = String(isFound.price).replace(/[^\d.]/g, "");

            return acc + (Number(price) * curr.quantity);

        }, 0);

    }, [cart, productsMap]);

    const cartItems = useMemo(() => {

        return cart.reduce((acc, curr) => {

            const product = productsMap.get(curr.id);

            if (!product) return acc;

            const price = String(product.price).replace(/[^\d.]/g, "");


            acc.push({ ...product, quantity: curr.quantity, price: price});

            return acc
        }, []);
    }, [cart, productsMap]);

    return { cartItems, sum };
}
