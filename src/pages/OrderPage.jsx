import { Link } from "react-router-dom";
import { MobileOrderCartItem } from "../components/MobileOrderCartItem";
import { DesktopOrderCartItem } from "../components/DesktopOrderCartItem";
import useOrderDetails from "../hooks/useOrderDetails";
import pen from "../assets/images/global/pen.png";
import errorImg from "../assets/images/global/error-icon.png";
import Map from "../components/Map";
import imgCancel from "../assets/images/global/cancel.png";
import { DELIVERY_PRICE } from "../helpers/deliveryPrice";
import Loader from "../components/Loader";

const EmptyCartView = () => (
    <main className="flex-1 container mx-auto max-w-330 flex items-center justify-center p-4 min-h-[60vh]">
        <div className="bg-white p-8 rounded-[30px] flex flex-col items-center justify-center text-center max-w-md w-full shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
            <span className="text-5xl mb-3">🛒</span>
            <h2 className="text-2xl font-bold mb-2">В заказе ничего нет</h2>
            <p className="text-gray-500 mb-6 text-sm">
                Кажется, ваша корзина пуста. Добавьте товары из каталога, чтобы оформить заказ.
            </p>
            <Link
                to="/"
                className="flex justify-center items-center bg-black text-white p-4 rounded-[15px] w-full no-underline font-medium hover:bg-gray-800 transition-colors"
            >
                В каталог товаров
            </Link>
        </div>
    </main>
);

const SuccessView = ({ orderID }) => (
    <div className="flex-col flex-1 h-full mt-10 min-[43.6875rem]:mt-0 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[30px] flex flex-col items-center justify-center gap-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] text-center max-w-md w-full">
            <h2 className="text-xl font-bold">✅ Заказ успешно размещен!</h2>
            <p className="m-0 text-gray-600">Номер вашего заказа №{orderID}.</p>
            <Link
                to="/"
                className="flex justify-center bg-black text-white p-3 mt-4 rounded-[15px] w-full no-underline hover:bg-gray-800 transition-colors"
            >
                На главную
            </Link>
        </div>
    </div>
);

const OrderFormView = (orderData) => {
    const {
        handleSubmit,
        activeCartItems,
        isDelivery,
        promoSum,
        activeSum,
        isCityOpen,
        setCityOpen,
        currentCity,
        register,
        handleClick,
        errors,
        isPaymentOpen,
        setPaymentOpen,
        currentPayment,
        appliedPromo,
        promocodes,
        setPromo,
        setValue,
        clearErrors,
        overallSum,
        isSending,
        toastMove,
        deliveryPrice
    } = orderData;

    const { onBlur, onChange, ref, name } = register("code", {
        validate: (value) => {
            if (!value) return true;
            const formattedValue = value.trim().toUpperCase();
            const isValid = promocodes.find((item) => item.code === formattedValue);
            return isValid ? true : "Нет такого промокода!";
        }
    });

    return (
        <form onSubmit={handleSubmit} className="p-6 flex flex-col min-[43.6875rem]:flex-row min-[43.6875rem]:gap-6 bg-white min-[43.6875rem]:bg-transparent">
            <div className="w-full mb-3 min-[43.6875rem]:hidden">
                {activeCartItems.map((item) => <MobileOrderCartItem key={item.id} item={item} />)}
            </div>

            <div className="w-full flex flex-col mb-3 min-[43.6875rem]:mb-0 min-[43.6875rem]:bg-white min-[43.6875rem]:p-6 min-[43.6875rem]:rounded-[30px] min-[43.6875rem]:flex-1">
                <div className="hidden min-[43.6875rem]:flex">
                    <h2 className="mb-2 font-bold">Доставка курьером</h2>
                    <p className="m-0 ml-auto font-medium">${DELIVERY_PRICE}</p>
                </div>

                <div className="flex flex-col mb-4 min-[43.6875rem]:hidden">
                    {isDelivery && (
                        <div className="flex mb-2">
                            <h2 className="text-base font-bold m-0">Доставка курьером</h2>
                            <p className="ml-auto font-medium m-0">${DELIVERY_PRICE}</p>
                        </div>
                    )}
                    <div className="flex mb-2">
                        <h2 className="text-base font-bold m-0">Скидка</h2>
                        <p className="sale-price ml-auto font-medium m-0">{promoSum}</p>
                    </div>
                    <div className="flex">
                        <h2 className="text-base font-bold m-0">Сумма</h2>
                        <p className="cart-order-sum-mob ml-auto font-medium m-0">${activeSum.toFixed(2)}</p>
                    </div>
                </div>

                <div className="mb-4 w-full h-36.5 bg-gray-200 rounded-lg">
                    <Map />
                </div>

                <div>
                    <div className="flex mb-2">
                        <h2 className="flex address gap-1 text-base font-bold m-0 items-center before:content-[''] before:bg-size-[15px_20px] before:w-3.75 before:h-5">
                            Адрес доставки
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="relative w-full">
                            <button onClick={() => setCityOpen((prev => !prev))} className="bg-[#e0e0e0] border-none h-11.25 rounded-[10px] w-full flex justify-between items-center px-4" type="button">
                                <span>{currentCity}</span>
                                <span className="text-[9px]">▼</span>
                            </button>

                            <input type="hidden" {...register("locationInput")} />

                            <ul className={`absolute top-full left-0 w-full mt-1 ${isCityOpen ? "" : "hidden"} bg-white shadow-lg rounded-lg z-20`}>
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
                                minLength: { value: 3, message: "Слишком короткое название" },
                                pattern: {
                                    value: /^[а-яА-ЯёЁa-zA-Z0-9\s.,\-]+$/,
                                    message: "Поле содержит запрещенные символы."
                                }
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
                                    value: /^\+993\d{8}$/,
                                    message: "Номер должен быть в формате +993 и содержать только цифры"
                                }
                            })} className={`w-full p-2 pr-10 bg-[#e0e0e0] border-none h-11.25 rounded-[10px] outline-none focus:ring-2 focus:ring-gray-400 ${errors.phone ? "error" : ""}`} type="tel" autoComplete="off" />
                            <img className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25" src={pen} alt="pen" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full min-[43.6875rem]:flex-1">
                <div className="hidden min-[43.6875rem]:block bg-white p-6 rounded-[30px] mb-4">
                    <h2 className="mb-4 text-lg font-bold">Ваш заказ</h2>

                    <div className="mb-3">
                        {/* {(buyNowItem) ? <DesktopOrderCartItem key={buyNowItem.id} item={buyNowItem} /> : cartItems.map((item) => <DesktopOrderCartItem key={item.id} item={item}) />} */}
                        {activeCartItems.map((item) => <DesktopOrderCartItem key={item.id} item={item} />)}
                    </div>

                    <div className="flex flex-col gap-3">
                        {isDelivery && <div className="flex justify-between">
                            <span className="font-medium">Доставка</span>
                            <span className="font-medium">${DELIVERY_PRICE}</span>
                        </div>}

                        <div className="flex justify-between">
                            <span className="font-medium">Сумма</span>
                            <span className="font-medium cart-order-sum">${activeSum.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Скидка</span>
                            <span className="font-medium cart-order-sale">${promoSum}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-lg">Общая сумма</span>
                            <span className="font-medium text-lg cart-order-sum-overall">${overallSum}</span>
                        </div>
                    </div>
                </div>

                <div className="min-[43.6875rem]:bg-white min-[43.6875rem]:p-6 min-[43.6875rem]:rounded-[30px] min-[43.6875rem]:mb-7">
                    <h2 className="font-bold mb-3 text-base min-[43.6875rem]:text-xl">Способ оплаты</h2>

                    <input type="hidden" {...register("paymentInput")} />

                    <div className="relative w-full mb-3">
                        <button onClick={() => setPaymentOpen((prev) => !prev)} className="bg-[#e0e0e0] border-none rounded-[10px] w-full flex justify-between items-center py-3 px-4" type="button">
                            <span className="flex items-center gap-2">
                                <span>💳</span>
                                <span>{currentPayment}</span>
                            </span>
                            <span className="text-[9px]">▼</span>
                        </button>

                        <ul className={`absolute top-full left-0 w-full mt-1 ${isPaymentOpen ? "" : "hidden"} bg-white shadow-lg rounded-lg z-20`}>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Kaspi Gold", "paymentInput", setPaymentOpen)}>Kaspi Gold</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Наличными курьеру", "paymentInput", setPaymentOpen)}>Наличными курьеру</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleClick("Visa / MasterCard", "paymentInput", setPaymentOpen)}>Visa / MasterCard</li>
                        </ul>
                    </div>

                    <div className="relative mb-3 flex items-center text-gray-500 cursor-pointer input-group" data-error={errors.code ? errors.code.message : ""}>
                        <img className="err-icon" src={errorImg} alt="error" />
                        <span className="absolute left-0 ml-3 top-1/2 -translate-y-1/2 z-10">🎫</span>
                        <input disabled={!!appliedPromo} placeholder="Есть промокод?"
                            onChange={onChange}
                            name={name}
                            ref={ref}
                            onBlur={(e) => {
                                onBlur(e);
                                const formattedValue = e.target.value.trim().toUpperCase();
                                const found = promocodes.find((item) => item.code === formattedValue);

                                if (found) {
                                    setPromo(found);
                                }
                            }}
                            className={`w-full bg-[#e0e0e0] text-black border-none rounded-[10px] pl-9.5 py-4 pr-3 outline-none focus:ring-2 focus:ring-gray-400 ${errors.code ? "error" : ""} ${appliedPromo ? "border border-solid border-green-500" : ""} disabled:bg-[rgba(0,255,0,0.08)]`} type="text" autoComplete="off" />
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                            }}
                            onClick={() => {
                                setValue("code", "");
                                setPromo(null);
                                clearErrors("code");
                            }} className="absolute right-3.25 top-1/2 -translate-y-1/2 w-4.25 h-4.25 z-10" type="button">
                            <img src={imgCancel} alt="cancel" />
                        </button>
                    </div>

                    <div className="flex justify-between mb-4 min-[43.6875rem]:hidden">
                        <span className="font-bold">К оплате</span>
                        <output className="font-bold payment-sum-overall">${overallSum}</output>
                    </div>
                </div>

                <button disabled={isSending || toastMove} type="submit" className="hidden min-[43.6875rem]:flex justify-center bg-black text-white w-full items-center p-5 rounded-[15px] hover:bg-gray-800 transition-colors">
                    <span>Оформление заказа</span>
                </button>
            </div>

            <div className="p-3 min-[43.6875rem]:hidden w-full">
                <button disabled={isSending || toastMove} type="submit" className="flex justify-center bg-black text-white w-full items-center p-5 rounded-[15px] hover:bg-gray-800 transition-colors border-none">
                    <span className="text-center">Разместить заказ</span>
                </button>
            </div>
        </form>
    );
};

export default function OrderPage() {
    const orderData = useOrderDetails();
    const { isLoading, isSuccess, activeCartItems, sendingError, orderID, toastMove } = orderData;

    if (isLoading) return <Loader />;

    if (!isSuccess && activeCartItems.length === 0) {
        return <EmptyCartView />;
    }

    return (
        <main className="flex-1 container mx-auto max-w-330 relative">
            {isSuccess ? <SuccessView orderID={orderID} /> : <OrderFormView {...orderData} />}

            <div className={`fixed pointer-events-none left-1/2 top-0 transition-transform duration-500 ${(toastMove) ? "translate-y-[200%]" : "translate-y-[-400%]"} -translate-x-1/2 bg-white border border-black p-2 rounded-2xl`}>
                <p>⛔ {sendingError?.message}</p>
            </div>
        </main>
    );
}