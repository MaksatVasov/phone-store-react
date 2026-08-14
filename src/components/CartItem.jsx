import { useContext } from "react";
import minusIcon from "../assets/images/cart-page/btn-qty-minus.png";
import plusIcon from "../assets/images/cart-page/btn-qty-plus.png";
import deleteBtn from "../assets/images/cart-page/delete-bin.png";

import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {

    const { dispatchCart } = useContext(CartContext);

    const { title, price, img, quantity, alt, id } = item;

    return (
        <div className="relative mb-4 h-full rounded-3xl border-none bg-white shadow-md">
            <div className="flex h-full flex-col justify-between px-6 py-4">
                <div className="mb-4 flex">
                    <img
                        className="mr-4 w-15 h-19"
                        src={`/images/${img}`}
                        alt={alt}
                    />

                    <div className="flex flex-col justify-center">
                        <h2 className="m-0 text-[1rem] font-medium">{title}</h2>
                        <p className="m-0 text-[1rem] font-semibold">{price + " $"}</p>
                    </div>

                    <div className="ml-auto flex items-start">
                        <button
                            type="button"
                            className="cursor-pointer border-none bg-transparent p-0 z-11"
                            onClick={() => dispatchCart({ type: "DELETE_FROM_CART", payload: { id } })}
                        >
                            <img
                                className="h-4.25 w-4.75"
                                src={deleteBtn}
                                alt="Удалить"
                            />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0 z-11"
                            onClick={() => dispatchCart({type: "DECREASE_QUANTITY", payload: { id }})}
                        >
                            <img
                                src={minusIcon}
                                alt="Уменьшить"
                                className="h-7.5 w-7.5"
                            />
                        </button>

                        <span className="text-[0.9rem] font-medium">{quantity}</span>

                        <button
                            type="button"
                            className="flex cursor-pointer items-center justify-center border-none bg-transparent p-0 z-11"
                            onClick={() => dispatchCart({type: "INCREASE_QUANTITY", payload: { id }})}
                        >
                            <img
                                src={plusIcon}
                                alt="Увеличить"
                                className="h-7.5 w-7.5"
                            />
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <p className="m-0 text-[0.9rem] font-semibold">
                            {price * quantity + " $"}
                        </p>
                    </div>
                </div>
            </div>
            <Link className="absolute z-10 inset-0" to={`/product/${id}`} />
        </div>
    );
}