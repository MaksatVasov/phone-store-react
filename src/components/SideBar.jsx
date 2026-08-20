import phoneIcon from "../assets/images/global/phone-logo.svg";
import useSideBarState from "../hooks/useSideBarState";
import DropDownItem from "./DropDownItem";
import { headphonesCatalog } from "../data/details/headphonesDetails.js";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function Sidebar() {
    const { sidebar, isListOpened, setOpen } = useSideBarState();
    const { setSidebar } = useContext(UIContext);

    const closeSidebar = () => setSidebar(false);

    const getActiveLink = ({ isActive }) =>
        `no-underline text-base flex items-center gap-2 transition-colors ${
            isActive ? "text-[#FFA542] font-semibold" : "text-black hover:text-[#FFA542]"
        }`;

    return (
        <>
            <div
                onClick={closeSidebar}
                className={`fixed inset-0 bg-black/50 z-9998 transition-opacity duration-300 ${
                    sidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <aside className={`fixed ${sidebar ? "translate-x-0" : "-translate-x-full"} left-0 top-0 z-9999 transition-transform duration-300 h-full w-80 bg-white shadow-2xl overflow-y-auto`}>
                <div className="flex flex-col p-4 h-full">
                    <div onClick={() => setOpen((prev) => !prev)} className="flex justify-between cursor-pointer z-10 w-full">
                        <span className="font-medium phone flex items-center justify-between mb-3 w-full">
                            Выбрать модель телефона
                            <span className={`${isListOpened ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>&#9662;</span>
                        </span>
                    </div>

                    <div className={`pl-4 transition-[grid-template-rows] duration-300 grid ${isListOpened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} mb-4`}>
                        <div className="overflow-hidden">
                            <ul>
                                {headphonesCatalog.map((item) => <DropDownItem key={item.brand} phone={item} />)}
                            </ul>
                        </div>
                    </div>

                    <nav className="flex flex-col">
                        <span className="flex items-center wishlist mb-2">
                            <NavLink to="/wishlist" onClick={closeSidebar} className={getActiveLink}>
                                <svg width="15" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.001 1.52898C12.35 -0.58002 15.98 -0.51002 18.243 1.75698C20.505 4.02498 20.583 7.63698 18.479 9.99298L9.99901 18.485L1.52101 9.99298C-0.582994 7.63698 -0.503994 4.01898 1.75701 1.75698C4.02201 -0.50702 7.64501 -0.58302 10.001 1.52898ZM16.827 3.16998C15.327 1.66798 12.907 1.60698 11.337 3.01698L10.002 4.21498L8.66601 3.01798C7.09101 1.60598 4.67601 1.66798 3.17201 3.17198C1.68201 4.66198 1.60701 7.04698 2.98001 8.62298L10 15.654L17.02 8.62398C18.394 7.04698 18.319 4.66498 16.827 3.16998Z" fill="currentColor" />
                                </svg>
                                Избранное
                            </NavLink>
                        </span>

                        <span className="flex items-center gap-2 mb-2">
                            <NavLink to="/terms" onClick={closeSidebar} className={getActiveLink}>
                                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1667 17H0.833333C0.61232 17 0.400358 16.9104 0.244078 16.751C0.0877973 16.5916 0 16.3754 0 16.15V0.85C0 0.624566 0.0877973 0.408365 0.244078 0.248959C0.400358 0.0895533 0.61232 0 0.833333 0H14.1667C14.3877 0 14.5996 0.0895533 14.7559 0.248959C14.9122 0.408365 15 0.624566 15 0.85V16.15C15 16.3754 14.9122 16.5916 14.7559 16.751C14.5996 16.9104 14.3877 17 14.1667 17ZM13.3333 15.3V1.7H1.66667V15.3H13.3333ZM3.33333 3.4H6.66667V6.8H3.33333V3.4ZM3.33333 8.5H11.6667V10.2H3.33333V8.5ZM3.33333 11.9H11.6667V13.6H3.33333V11.9ZM8.33333 4.25H11.6667V5.95H8.33333V4.25Z" fill="currentColor" />
                                </svg>
                                Условия сервиса
                            </NavLink>
                        </span>

                        <span className="flex items-center gap-2 mb-2">
                            <NavLink to="/contacts" onClick={closeSidebar} className={getActiveLink}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.305 6.40167C6.08695 7.7754 7.2246 8.91305 8.59833 9.695L9.335 8.66333C9.45346 8.49745 9.62862 8.38073 9.82734 8.33528C10.026 8.28982 10.2345 8.31878 10.4133 8.41667C11.5919 9.06077 12.8935 9.44815 14.2325 9.55333C14.4415 9.56989 14.6365 9.66461 14.7788 9.8186C14.921 9.97259 15 10.1745 15 10.3842V14.1025C15 14.3088 14.9235 14.5078 14.7853 14.661C14.6471 14.8142 14.4569 14.9106 14.2517 14.9317C13.81 14.9775 13.365 15 12.9167 15C5.78333 15 0 9.21667 0 2.08333C0 1.635 0.0225 1.19 0.0683333 0.748333C0.0893788 0.543081 0.18582 0.352934 0.338991 0.214695C0.492163 0.076456 0.691172 -4.44648e-05 0.8975 1.93894e-08H4.61583C4.82547 -2.62654e-05 5.02741 0.0789596 5.1814 0.221209C5.33539 0.363458 5.43011 0.55852 5.44667 0.7675C5.55185 2.10649 5.93923 3.40807 6.58333 4.58667C6.68122 4.76547 6.71018 4.97395 6.66472 5.17266C6.61927 5.37137 6.50255 5.54654 6.33667 5.665L5.305 6.40167ZM3.20333 5.85417L4.78667 4.72333C4.33732 3.75341 4.02946 2.72403 3.8725 1.66667H1.675C1.67 1.805 1.6675 1.94417 1.6675 2.08333C1.66667 8.29667 6.70333 13.3333 12.9167 13.3333C13.0558 13.3333 13.195 13.3308 13.3333 13.325V11.1275C12.276 10.9705 11.2466 10.6627 10.2767 10.2133L9.14583 11.7967C8.69055 11.6198 8.24834 11.4109 7.8225 11.1717L7.77417 11.1442C6.13965 10.2139 4.78607 8.86035 3.85583 7.22583L3.82833 7.1775C3.58909 6.75166 3.38024 6.30945 3.20333 5.85417Z" fill="currentColor" />
                                </svg>
                                Контакты
                            </NavLink>
                        </span>
                    </nav>

                    <div className="flex items-center gap-3 lang mb-2 mt-4">
                        <span className="cursor-pointer font-medium hover:text-[#FFA542] transition-colors">Каз</span>
                        <span className="cursor-pointer font-medium hover:text-[#FFA542] transition-colors">Рус</span>
                        <span className="cursor-pointer font-medium hover:text-[#FFA542] transition-colors">Eng</span>
                    </div>
                </div>
            </aside>
        </>
    );
}