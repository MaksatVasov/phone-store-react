import instaLogo from "../assets/images/global/Instagram.svg";
import vkLogo from "../assets/images/global/VK.svg";
import telegramLogo from "../assets/images/global/Telegram.svg";
import whatsAppLogo from "../assets/images/global/Whatsapp.svg";
import languageLogo from "../assets/images/global/earth-footer.png";
import { useLocation, NavLink, Link } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    const isOrderPage = location.pathname === "/order";
    const isCartPage = location.pathname === "/cart";

    const getActiveLink = ({ isActive }) =>
        `no-underline text-[1rem] block transition-colors ${
            isActive ? "text-[#FFA542] font-semibold" : "text-black hover:text-[#FFA542]"
        }`;

    return (
        <footer
            className={`container mx-auto max-w-330 text-center p-6 bg-white rounded-t-4xl ${
                isOrderPage ? "hidden min-[43.6875rem]:block" : ""
            } ${isCartPage ? "hidden min-[1200px]:block" : ""}`}
        >
            <div className="flex flex-wrap">
                
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <Link
                        to="/"
                        className="text-black font-bold text-3xl mb-6 min-[992px]:mb-0 min-[992px]:text-start block no-underline"
                    >
                        Qpick
                    </Link>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>

                
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <ul className="list-none p-0 mb-0 min-[992px]:text-start flex flex-col gap-2">
                        <li>
                            <NavLink to="/wishlist" className={getActiveLink}>
                                Избранное
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={getActiveLink}>
                                Корзина
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contacts" className={getActiveLink}>
                                Контакты
                            </NavLink>
                        </li>
                    </ul>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>

                <hr className="hidden w-full min-[576px]:block min-[992px]:hidden opacity-25" />

                
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <div className="flex flex-col justify-between">
                        <span className="block mb-2">
                            <Link to="/terms" className="no-underline text-black hover:text-[#FFA542]">
                                Условия сервиса
                            </Link>
                        </span>
                        <div className="flex justify-center gap-4 items-center">
                            <span><img src={languageLogo} alt="Языки" /></span>
                            <span className="block cursor-pointer font-medium">Каз</span>
                            <span className="block cursor-pointer font-medium">Рус</span>
                            <span className="block cursor-pointer font-medium">Eng</span>
                        </div>
                    </div>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>

                
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <div className="flex justify-center items-center gap-4 min-[576px]:mt-6 min-[992px]:mt-0 min-[992px]:justify-end">
                        <a href="https://vk.com" target="_blank" rel="noreferrer"><img src={vkLogo} alt="VK" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"><img src={instaLogo} alt="instagram" /></a>
                        <a href="https://t.me" target="_blank" rel="noreferrer"><img src={telegramLogo} alt="telegram" /></a>
                        <a href="https://whatsapp.com" target="_blank" rel="noreferrer"><img src={whatsAppLogo} alt="whatsapp" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}