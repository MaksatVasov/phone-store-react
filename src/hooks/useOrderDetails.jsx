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

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
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

    const sendFormData = async (data) => {
        try {
            const response = await fetch('https://6a29b31cf59cb8f65f1d812a.mockapi.io/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Заказ успешно оформлен! 🎉');
                reset();
            } else {
                alert('Ошибка при отправке.');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
        errors,
        sendFormData
    };
}