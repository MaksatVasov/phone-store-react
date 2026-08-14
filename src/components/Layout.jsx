import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorWindow from "./Error";
import { UIProvider } from "./UIContext";
import DataProvider from "./DataContext";
import WishListProvider from "./WishListContext";
import CartProvider from "./CartContext";
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