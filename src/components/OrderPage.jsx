import { useContext } from "react";
import useCartDetails from "../hooks/useCartDetails";
import { CartContext } from "./CartContext";
import { MobileOrderCartItem } from "./MobileOrderCartItem";
import { DesktopOrderCartItem } from "./DesktopOrderCartItem";
import useOrderDetails from "../hooks/useOrderDetails";

import pen from "../assets/images/global/pen.png"
import errorImg from "../assets/images/global/error-icon.png";

export default function OrderPage() {
    const {
        isCityOpen,
        setCityOpen,
        isPaymentOpen,
        setPaymentOpen,
        cartItems,
        sum,
        isDelivery,
        cityListener,
        paymentListener,
        register,
        handleSubmit,
        handleClick,
        currentCity,
        currentPayment,
        errors
    } = useOrderDetails();



    return (
        <main className="flex-1 container mx-auto max-w-330" id="parentMain">

            <div id="main-order" className="p-4 flex flex-col min-[43.6875rem]:flex-row min-[43.6875rem]:gap-6 bg-white min-[43.6875rem]:bg-transparent">


                <div id="cart-order-mobile" className="w-full mb-3 min-[43.6875rem]:hidden ">
                    {cartItems.map((item) => <MobileOrderCartItem key={item.id} item={item} />)}
                </div>

                <div id="delivery" className="w-full flex flex-col mb-3 min-[43.6875rem]:mb-0 min-[43.6875rem]:bg-white min-[43.6875rem]:p-6 min-[43.6875rem]:rounded-[30px] min-[43.6875rem]:flex-1">

                    <div className="hidden min-[43.6875rem]:flex">
                        <h2 className="mb-2 font-bold">Доставка курьером</h2>
                        <p className="m-0 ml-auto font-medium">499 TMT</p>
                    </div>

                    <div className="flex flex-col mb-4 min-[43.6875rem]:hidden">
                        {isDelivery && (
                            <div className="flex mb-2">
                                <h2 className="text-base font-bold m-0">Доставка курьером</h2>
                                <p className="ml-auto font-medium m-0">499 TMT</p>
                            </div>
                        )}
                        <div className="flex mb-2">
                            <h2 className="text-base font-bold m-0">Скидка</h2>
                            <p className="sale-price ml-auto font-medium m-0"></p>
                        </div>
                        <div className="flex">
                            <h2 className="text-base font-bold m-0">Сумма</h2>
                            <p className="cart-order-sum-mob ml-auto font-medium m-0">{sum} TMT </p>
                        </div>
                    </div>

                    <div id="map" className="mb-4 w-full h-36.5 xl:w-87.5 bg-gray-200 rounded-lg">
                        {/* Карта */}
                    </div>

                    <div id="address">
                        <div className="flex mb-2">
                            <h2 className="flex address gap-1 text-base font-bold m-0 items-center before:content-[''] before:bg-size-[15px_20px] before:w-3.75 before:h-5">
                                Адрес доставки
                            </h2>
                        </div>

                        <form id="order-form" className="flex flex-col gap-2">


                            <div className="relative w-full">
                                <button onClick={cityListener} className="bg-[#e0e0e0] border-none h-11.25 rounded-[10px] w-full flex justify-between items-center px-4" type="button">
                                    <span id="cur-choice">{currentCity}</span>
                                    <span className="text-[9px]">▼</span>
                                </button>


                                <input type="hidden" {...register("locationInput")} />

                                <ul
                                    id="location-choice"
                                    className={`absolute ${isCityOpen.isOpen ? "" : "hidden"} bg-white shadow-lg rounded-lg z-20`}
                                    style={{ top: isCityOpen.top, left: isCityOpen.left, width: isCityOpen.width }}
                                >
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Ахалский велаят", "locationInput", setCityOpen)}>Ахалский велаят</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Балканский велаят", "locationInput", setCityOpen)}>Балканский велаят</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Дашогузский велаят", "locationInput", setCityOpen)}>Дашогузский велаят</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Лебапский велаят", "locationInput", setCityOpen)}>Лебапский велаят</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Марыйский велаят", "locationInput", setCityOpen)}>Марыйский велаят</li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Ашхабад", "locationInput", setCityOpen)}>Ашхабад</li>
                                </ul>
                            </div>


                            <div className="relative w-full flex items-center input-group" data-error={errors.street ? errors.street.message : ""}>
                                <img className="err-icon" src={errorImg} alt="error" />
                                <input placeholder="Улица/Район" {...register("street", {
                                    required: "Укажите улицу!",
                                    minLength: { value: 3, message: "Слишком короткое название" }
                                })} className={`w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400 ${errors.street ? "error" : ""}`} type="text" autoComplete="off" />
                                <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                            </div>


                            <div className="flex gap-3">
                                <div className="relative w-full flex items-center group">
                                    <input placeholder="Дом" {...register("house")} className="w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400" type="text" autoComplete="off" />
                                    <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                                </div>
                                <div className="relative w-full flex items-center group">
                                    <input placeholder="Подъезд" {...register("entrance")} className="w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400" type="text" autoComplete="off" />
                                    <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                                </div>
                            </div>


                            <div className="flex gap-3">
                                <div className="relative w-full flex items-center group">
                                    <input placeholder="Этаж" {...register("floor")} className="w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400" type="text" autoComplete="off" />
                                    <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                                </div>
                                <div className="relative w-full flex items-center group">
                                    <input placeholder="Квартира" {...register("flat")} className="w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400" type="text" autoComplete="off" />
                                    <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                                </div>
                            </div>


                            <div className="relative w-full flex items-center input-group" data-error={errors.phone ? errors.phone.message : ""}>
                                <img className="err-icon" src={errorImg} alt="error" />
                                <input placeholder="+993..." {...register("phone", {
                                    required: "Заполните поле!",
                                    pattern: {
                                        value: /^\+993/,
                                        message: "Номер должен быть в формате +993"
                                    }
                                })}
                                    className={`w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400 ${errors.phone ? "error" : ""}`} type="tel" autoComplete="off" />
                                <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                            </div>
                        </form>
                    </div>
                </div>

                <div id="payment" className="w-full min-[43.6875rem]:flex-1">


                    <div className="hidden min-[43.6875rem]:block bg-white p-6 rounded-[30px] mb-4">
                        <h2 className="mb-4 text-lg font-bold">Ваш заказ</h2>

                        <div id="cart-container-tablet-desktop" className="mb-3">
                            {cartItems.map((item) => <DesktopOrderCartItem key={item.id} item={item} />)}
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span className="font-medium">Доставка</span>
                                <span className="font-medium">499 TMT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Сумма</span>
                                <span className="font-medium cart-order-sum">{sum} TMT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Скидка</span>
                                <span className="font-medium cart-order-sale"></span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-lg">Общая сумма</span>
                                <span className="font-medium text-lg cart-order-sum-overall"></span>
                            </div>
                        </div>
                    </div>


                    <div className="min-[43.6875rem]:bg-white min-[43.6875rem]:p-6 min-[43.6875rem]:rounded-[30px] min-[43.6875rem]:mb-7">
                        <h2 className="font-bold mb-3 text-base min-[43.6875rem]:text-xl">Способ оплаты</h2>


                        <input type="hidden" form="order-form" {...register("paymentInput")} />


                        <div className="relative w-full mb-3">
                            <button onClick={paymentListener} className="bg-[#e0e0e0] border-none rounded-[10px] w-full flex justify-between items-center py-3 px-4" type="button">
                                <span className="flex items-center gap-2">
                                    <span>💳</span>

                                    <span id="payment-cur-choice">{currentPayment}</span>
                                </span>
                                <span className="text-[9px]">▼</span>
                            </button>


                            <ul
                                id="payment-choice"
                                className={`absolute ${isPaymentOpen.isOpen ? "" : "hidden"} bg-white shadow-lg rounded-lg z-20`}
                                style={{ top: isPaymentOpen.top, left: isPaymentOpen.left, width: isPaymentOpen.width }}
                            >
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Kaspi Gold", "paymentInput", setPaymentOpen)}>Kaspi Gold</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Наличными курьеру", "paymentInput", setPaymentOpen)}>Наличными курьеру</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Visa / MasterCard", "paymentInput", setPaymentOpen)}>Visa / MasterCard</li>
                            </ul>
                        </div>


                        <div className="relative mb-3 flex items-center text-gray-500 cursor-pointer">
                            <span className="absolute left-0 ml-3 top-1/2 -translate-y-1/2 z-10">🎫</span>
                            <input placeholder="Есть промокод?" {...register("code")} className="w-full bg-[#e0e0e0] border-none rounded-[10px] pl-9.5 py-4 pr-3 outline-none focus:ring-2 focus:ring-gray-400" type="text" autoComplete="off" id="promo-input" form="order-form" />
                        </div>


                        <div className="flex justify-between mb-4 min-[43.6875rem]:hidden">
                            <span className="font-bold">К оплате</span>
                            <output className="font-bold payment-sum-overall"></output>
                        </div>
                    </div>


                    <button type="submit" form="order-form" className="hidden min-[43.6875rem]:flex justify-center bg-black text-white w-full items-center p-5 rounded-[15px] hover:bg-gray-800 transition-colors">
                        <span>Оформление заказа</span>
                    </button>
                </div>


                <div className="p-3 min-[43.6875rem]:hidden w-full">
                    <button type="submit" form="order-form" className="flex justify-center bg-black text-white w-full items-center p-5 rounded-[15px] hover:bg-gray-800 transition-colors border-none">
                        <span className="text-center">Разместить заказ</span>
                    </button>
                </div>
            </div>


            <div id="success-screen" className="hidden flex-col flex-1 h-full mt-10 min-[43.6875rem]:mt-0">
                <div className="bg-white p-6 rounded-[30px] flex flex-col items-center justify-center gap-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] text-center">
                    <h2 className="text-xl font-bold">✅ Заказ успешно размещен!</h2>
                    <p className="m-0 text-gray-600">Номер вашего заказа №123123.</p>
                    <a className="hidden min-[43.6875rem]:flex justify-center bg-black text-white p-3 mt-4 rounded-[15px] max-w-95 w-full no-underline hover:bg-gray-800 transition-colors" href="/">
                        На главную
                    </a>
                </div>
                <a className="flex min-[43.6875rem]:hidden justify-center bg-black text-white p-3 mt-auto w-full rounded-[15px] no-underline hover:bg-gray-800 transition-colors" href="/">
                    На главную
                </a>
            </div>

        </main>
    );
}