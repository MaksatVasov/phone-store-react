
import instaLogo from "../assets/images/global/Instagram.svg";
import vkLogo from "../assets/images/global/VK.svg";
import telegramLogo from "../assets/images/global/Telegram.svg";
import whatsAppLogo from "../assets/images/global/Whatsapp.svg";
import languageLogo from "../assets/images/global/earth-footer.png";
import { useLocation } from "react-router-dom";

export default function Footer() {

    const location = useLocation();

    const isOrderPage = location.pathname === "/order";

    const isCartPage = location.pathname === "/cart";

    // console.dir(URL)
    return (
        <footer className={`container mx-auto max-w-330 text-center p-6 bg-[rgba(255,255,255,1)] rounded-t-4xl ${isOrderPage ? "hidden min-[43.6875rem]:block" : ""} 
        ${(isCartPage) ? "hidden min-[1200px]:block" : ""}`}>
            <div className="flex flex-wrap">
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]"><a href="index.html"
                    className="text-black font-bold text-3xl mb-6 min-[992px]:mb-0 min-[992px]:text-start  block text-decoration-none">Qpick</a>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <ul className="list-unstyled mb-0 min-[992px]:text-start">
                        <li className="mb-2"><a href="terms.html"
                            className="text-decoration-none text-black text-[1rem]  block">Избранное</a></li>
                        <li className="mb-2"><a href="cart.html"
                            className="text-decoration-none text-black text-[1rem]  block">Корзина</a></li>
                        <li className="mb-2"><a href="javascript:void(0)"
                            className="text-decoration-none text-black text-[1rem]  block">Контакты</a></li>
                    </ul>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>
                <hr className="hidden w-full min-[576px]:block min-[992px]:hidden opacity-25" />
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <div className="flex flex-col justify-between"><span className="block mb-2"><a
                        className="no-underline text-black" href="terms.html">Условия
                        сервиса</a></span>
                        <div className="flex justify-center gap-4 items-center">
                            <span><img src={languageLogo} alt="Языки" /></span>
                            <span className="block"><a className="no-underline text-black text-[1rem]  block"
                                href="">Каз</a></span>
                            <span className="block"><a className="no-underline text-black text-[1rem]  block"
                                href="">Рус</a></span>
                            <span className="block"><a className="no-underline text-black text-[1rem]  sblock"
                                href="">Eng</a></span>
                        </div>
                    </div>
                    <hr className="block opacity-25 min-[576px]:hidden" />
                </div>
                <div className="grow-0 shrink-0 basis-auto w-full min-[576px]:w-[50%] min-[992px]:w-[25%]">
                    <div className="flex justify-center items-center gap-4 min-[576px]:mt-6 min-[992px]:mt-0 min-[992px]:justify-end">
                        <span><a href=""><img src={vkLogo} alt="VK" /></a></span>
                        <span><a href=""><img src={instaLogo} alt="instagram" /></a></span>
                        <span><a href=""><img src={telegramLogo} alt="telegram" /></a></span>
                        <span><a href=""><img src={whatsAppLogo} alt="whatsapp" /></a></span>
                    </div>
                </div>
            </div>
        </footer>
    )

}