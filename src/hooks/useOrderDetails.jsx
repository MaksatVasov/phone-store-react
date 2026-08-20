import { useContext, useEffect, useRef, useState } from "react";
import useCartDetails from "./useCartDetails";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import promocodes from "../data/details/promocodes.json";
import { DELIVERY_PRICE } from "../helpers/deliveryPrice";
import { DataContext } from "../context/DataContext";
import { defaultErrorState } from "../helpers/errorHelpers";
import { useLocation } from "react-router-dom";

export default function useOrderDetails() {

    const { isLoading } = useContext(DataContext);
    const [isSending, setSending] = useState(false);
    const [isCityOpen, setCityOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [appliedPromo, setPromo] = useState(JSON.parse(localStorage.getItem("promo")));
    const [sendingError, setSendingError] = useState(defaultErrorState());
    const [orderID, setID] = useState(null);
    const [toastMove, setToastMove] = useState(false);

    
    const { cartItems: contextCartItems, sum: contextSum } = useCartDetails();
    const { isDelivery, dispatchCart } = useContext(CartContext);

    const timer1 = useRef(null);
    const timer2 = useRef(null);

    useEffect(() => {
        localStorage.setItem("promo", JSON.stringify(appliedPromo));
    }, [appliedPromo]);

    const { register, handleSubmit, setValue, clearErrors, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            locationInput: "Ашхабад",
            paymentInput: "Kaspi Gold",
            street: "",
            house: "",
            entrance: "",
            floor: "",
            flat: "",
            phone: "",
            code: (appliedPromo?.code) ? appliedPromo.code : ""
        },
        mode: "onBlur"
    });

    
    const location = useLocation();
    const buyNowItem = location?.state?.buyNowItem;

    
    
    
    const activeCartItems = buyNowItem ? [buyNowItem] : contextCartItems;
    const activeSum = buyNowItem ? Number(buyNowItem.price) : contextSum;

    const deliveryPrice = (isDelivery) ? DELIVERY_PRICE : 0;

    
    let promoSum = 0;
    if (appliedPromo) {
        promoSum = Number(appliedPromo.type === "fixed" ? appliedPromo.value : (activeSum * appliedPromo.value) / 100).toFixed(2);
    }

    
    const overallSum = Math.max(0, Number((activeSum - promoSum + deliveryPrice).toFixed(2)));

    const currentCity = watch("locationInput");
    const currentPayment = watch("paymentInput");

    const onSubmit = async (data) => {
        setSending(true);

        const orderPayload = {
            ...data,
            items: activeCartItems, 
            totalPaid: overallSum,  
            discountApplied: promoSum
        };

        try {
            const response = await fetch('https://6a29b31cf59cb8f65f1d812a.mockapi.io/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            });

            if (response.ok) {
                setSendingError(defaultErrorState());
                setIsSuccess(true);
                reset();
                
                
                if (!buyNowItem) {
                    dispatchCart({ type: "CLEAR_CART" });
                }
                
                setPromo(null);
                const orderObj = await response.json();
                setID(orderObj.id);
            } else {
                clearTimeout(timer1.current);
                clearTimeout(timer2.current);
                setToastMove(true);
                setSendingError({ isError: true, message: "Сервер недоступен. Попробуйте позже." });
                timer1.current = setTimeout(() => setToastMove(false), 3000);
                timer2.current = setTimeout(() => setSendingError(defaultErrorState()), 4500);
            }
        } catch (error) {
            clearTimeout(timer1.current);
            clearTimeout(timer2.current);
            setToastMove(true);
            setSendingError({ isError: true, message: "Сервер недоступен. Попробуйте позже." });
            timer1.current = setTimeout(() => setToastMove(false), 3000);
            timer2.current = setTimeout(() => setSendingError(defaultErrorState()), 4500);
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    const handleClick = (value, inputName, closeSetter) => {
        setValue(inputName, value);
        closeSetter(false);
    };

    return {
        isCityOpen, setCityOpen,
        isPaymentOpen, setPaymentOpen,
        activeCartItems, 
        activeSum,       
        isDelivery, register,
        handleSubmit: handleSubmit(onSubmit),
        handleClick,
        currentCity, currentPayment,
        errors, promocodes,
        promoSum, overallSum,
        isSuccess, appliedPromo, setPromo, setValue, clearErrors,
        isLoading, isSending, sendingError, orderID,
        toastMove, setToastMove,
        deliveryPrice
    };
}