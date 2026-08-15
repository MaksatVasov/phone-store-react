import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorWindow from "./Error";
import { UIProvider } from "../context/UIContext";
import DataProvider from "../context/DataContext";
import WishListProvider from "../context/WishListContext";
import CartProvider from "../context/CartContext";
import Sidebar from "./SideBar";


export default function Layout() {


    return (
        <DataProvider>
            <CartProvider>
                <WishListProvider>
                    <UIProvider>
                        <div className="flex flex-col min-h-screen">

                            <Header />
                            <Sidebar />
                            <Outlet />
                            <Footer />
                            
                        </div>
                        <ErrorWindow />
                    </UIProvider>
                </WishListProvider>
            </CartProvider>
        </DataProvider>
    )
}