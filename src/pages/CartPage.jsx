import { Link } from "react-router-dom";
import cartEmptySmall from "../assets/images/cart-page/cart-empty-small.webp";
import cartEmptyBig from "../assets/images/cart-page/cart-empty-big.webp";
import truckIcon from "../assets/images/cart-page/Truck.png";
import mapPreview from "../assets/images/cart-page/map.png";

import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import useCartDetails from "../hooks/useCartDetails";
import Map from "../components/Map";
import CartItem from "../components/CartItem";

const containerClassName =
    "container mx-auto w-full px-3 max-w-330";

function CheckoutBar() {

    const { sum } = useCartDetails();

    const { isDelivery } = useContext(CartContext);

    const cartSum = (isDelivery) ? Number(sum) + 499 : sum;

    return (
        <section
            className="fixed bottom-0 left-1/2 z-1039 w-[calc(100%-32px)] max-w-285 -translate-x-1/2 rounded-4xl bg-white min-[1200px]:top-27 min-[1200px]:bottom-auto min-[1200px]:max-w-87.5 min-[1200px]:translate-x-1/2"
            aria-label="Итог заказа"
        >
            <div className="flex justify-between px-6 py-4">
                <p className="m-0 text-base font-semibold">ИТОГО</p>
                <output id="cart-sum" className="m-0 text-base font-semibold">{cartSum + " $"}</output>
            </div>

            <Link
                to={"/order"}
                className="flex w-full cursor-pointer justify-center rounded-4xl bg-black px-6 py-4 text-base font-semibold text-white no-underline shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)]"
            >
                Перейти к оформлению
            </Link>
        </section>
    );
}

function DeliveryPanel() {

    const { isDelivery, setDelivery } = useContext(CartContext);

    return (
        <section
            className="mb-4 w-full rounded-4xl bg-white shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] min-[1200px]:fixed min-[1200px]:left-1/2 min-[1200px]:top-62.75 min-[1200px]:max-w-87.5 min-[1200px]:translate-x-1/2"
            aria-label="Способ доставки"
        >
            <div className={`flex justify-between px-6 py-4 ${(isDelivery) ? "opacity-100" : "opacity-0"} `}>
                <p className="m-0 text-base font-semibold">Доставка</p>
                <span className="text-base">499 $</span>
            </div>

            <div id="map" className="h-36.5 w-full">
                <Map />
            </div>

            <div className="relative flex items-center justify-between px-6 py-4">
                <p className="m-0 flex items-center gap-3 text-base font-medium">
                    <img src={truckIcon} className="h-3.25 w-4.75" alt="Delivery" aria-hidden="true" />
                    Доставка курьером
                </p>

                <input
                    id="delivery-checkbox"
                    className="peer absolute right-6 top-1/2 z-10 h-6 w-6 -translate-y-1/2 cursor-pointer opacity-0"
                    type="checkbox"
                    aria-label="Доставка курьером"
                    onChange={() => setDelivery((prev) => !prev)}
                    checked={isDelivery}
                />
                <span
                    className="flex h-6 w-6 items-center justify-center rounded-[5px] border-2 border-black bg-[rgba(163,158,158,0.2)] after:content-['✓'] after:opacity-0 after:transition-opacity after:duration-300 peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-checked:after:opacity-100"
                    aria-hidden="true"
                />
            </div>
        </section>
    );
}

function CartContent() {

    const { cartItems } = useCartDetails();

    return (
        <section id="cart-block" aria-hidden="true">
            <div className={`${containerClassName} min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:justify-between`}>
                <div className="w-full min-[1200px]:max-w-158.25 min-[1200px]:mx-0">
                    <div id="cart" >
                        {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
                    </div>
                </div>

                <CheckoutBar />
                <DeliveryPanel />
            </div>
        </section>
    );
}

function EmptyCartState() {
    return (
        <section id="cart-empty-block" className="mt-7.5 flex flex-col items-center justify-center">
            <picture>
                <source media="(min-width: 992px)" srcSet={cartEmptyBig} />
                <source media="(min-width: 420px)" srcSet={cartEmptySmall} />
                <img
                    className="h-full w-full max-h-49 max-w-63.75 object-contain min-[1200px]:max-h-78.75 min-[1200px]:max-w-102"
                    src={cartEmptySmall}
                    alt="Пустая корзина"
                />
            </picture>

            <h2 className="mb-2 mt-4 text-xl font-medium leading-[1.2] min-[1200px]:text-[2rem]">
                Корзина пуста
            </h2>

            <small className="mb-6 text-sm text-[#838383] min-[1200px]:text-xl">
                Но это никогда не поздно исправить :)
            </small>

            <div className="w-full flex justify-center text-center">
                <Link
                    to="/"
                    className="border-0 text-white rounded-4xl bg-black px-6 py-4 max-w-[280.9px] w-full min-[1200px]:max-w-135"
                >
                    В каталог товаров
                </Link>
            </div>
        </section>
    );
}

export default function CartPage() {

    const { cart, dispatchCart } = useContext(CartContext);



    return (
        <main
            className={`relative ${containerClassName} flex grow flex-col pb-30 min-[1200px]:pb-5`}
        >
            {(cart.length > 0) ? <CartContent /> : <EmptyCartState />}



        </main>
    );
}
