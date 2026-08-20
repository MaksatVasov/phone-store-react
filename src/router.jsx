import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CassesPage from "./pages/CassesPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ContactsPage from "./pages/ContactsPage";
import TermsPage from "./pages/TermsPage";

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
        },
        {
            path: "contacts",
            element: <ContactsPage />
        },
        {
            path: "terms",
            element: <TermsPage />
        }
    ]
}])