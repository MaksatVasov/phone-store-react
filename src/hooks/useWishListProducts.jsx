
import { DataContext } from "../context/DataContext";
import { WishListContext } from "../context/WishListContext";
import { useContext } from "react";

export default function useWishListProducts() {

    const { products } = useContext(DataContext);
    const { wishListItems } = useContext(WishListContext);

    if(!products) return [];

    return products.filter((item) => wishListItems.includes(item.id));
}