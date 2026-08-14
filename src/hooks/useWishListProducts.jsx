
import { DataContext } from "../components/DataContext";
import { WishListContext } from "../components/WishListContext";
import { useContext } from "react";

export default function useWishListProducts() {

    const { products } = useContext(DataContext);
    const { wishListItems } = useContext(WishListContext);

    if(!products) return [];

    return products.filter((item) => wishListItems.includes(item.id));
}