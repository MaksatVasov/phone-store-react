import { useContext, useState } from "react";
import useCartDetails from "./useCartDetails";
import { CartContext } from "../components/CartContext";
import { useForm } from "react-hook-form";

export function defaultSettings() {
    return { isOpen: false, top: 0, left: 0, width: 0 };
}

export default function useOrderDetails() {

    const [isCityOpen, setCityOpen] = useState(defaultSettings());
    const [isPaymentOpen, setPaymentOpen] = useState(defaultSettings());


    const { cartItems, sum } = useCartDetails();
    const { isDelivery } = useContext(CartContext);


    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            locationInput: "Ашхабад",
            paymentInput: "Kaspi Gold",
            street: "",
            house: "",
            entrance: "",
            floor: "",
            flat: "",
            phone: "",
            code: ""
        },
        mode: "onBlur"
    });

    

    // Следим за значениями для кнопок
    const currentCity = watch("locationInput");
    const currentPayment = watch("paymentInput");


    const handleClick = (value, inputName, closeSetter) => {
        setValue(inputName, value);
        closeSetter(defaultSettings());
    };


    function cityListener(event) {
        if (isCityOpen.isOpen) {
            setCityOpen(defaultSettings());
            return;
        }

        const target = event.currentTarget;
        setCityOpen({
            isOpen: true,
            left: target.offsetLeft + "px",
            top: target.offsetTop + target.offsetHeight + "px",
            width: target.offsetWidth + "px",
        });
    }


    function paymentListener(event) {
        if (isPaymentOpen.isOpen) {
            setPaymentOpen(defaultSettings());
            return;
        }

        const target = event.currentTarget;
        setPaymentOpen({
            isOpen: true,
            left: target.offsetLeft + "px",
            top: target.offsetTop + target.offsetHeight + "px",
            width: target.offsetWidth + "px",
        });
    }


    return {
        isCityOpen,
        isPaymentOpen,
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
        setPaymentOpen,
        setCityOpen,
        errors
    };
}