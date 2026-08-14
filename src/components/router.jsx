import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import ProductPage from "./Product";
import CassesPage from "./CassesPage";
import WishListPage from "./WishListPage";
import CartPage from "./CartPage";
import OrderPage from "./OrderPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "product/:id",
            element: <ProductPage />
        },
        {
            path: "cases/:type",
            element: <CassesPage />
        },
        {
            path: "wishlist",
            element: <WishListPage />
        },
        {
            path: "cart",
            element: <CartPage />
        },
        {
            path: "order",
            element: <OrderPage />
        }
    ]
}])