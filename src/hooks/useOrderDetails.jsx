import { useContext, useState } from "react";
import useCartDetails from "./useCartDetails";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import promocodes from "../data/phoneCatalog/promocodes.json";

export default function useOrderDetails() {

    const [isCityOpen, setCityOpen] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [appliedPromo, setPromo] = useState(null);

    const { cartItems, sum } = useCartDetails();
    const { isDelivery, dispatchCart } = useContext(CartContext);

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
            code: ""
        },
        mode: "onBlur"
    });

    const currentCity = watch("locationInput");
    const currentPayment = watch("paymentInput");
    // const currentCode = watch("code");

    const cartSum = isDelivery ? Number(sum) + 499 : Number(sum);



    let promoSum = 0;
    if (appliedPromo) {
        promoSum = appliedPromo.type === "fixed" ? appliedPromo.value : (cartSum * appliedPromo.value) / 100;
    }

    const overallSum = Math.max(0, Number((cartSum - promoSum).toFixed(2)));

    const onSubmit = async (data) => {
        const orderPayload = {
            ...data,
            items: cartItems,
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
                setIsSuccess(true);
                reset();
                dispatchCart("CLEAR_CART");
            } else {
                alert('Ошибка при отправке.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (value, inputName, closeSetter) => {
        setValue(inputName, value);
        closeSetter(false);
    };

    return {
        isCityOpen,
        setCityOpen,
        isPaymentOpen,
        setPaymentOpen,
        cartItems,
        cartSum,
        isDelivery,
        register,
        handleSubmit: handleSubmit(onSubmit),
        handleClick,
        currentCity,
        currentPayment,
        errors,
        promocodes,
        promoSum,
        overallSum,
        isSuccess,
        appliedPromo,
        setPromo,
        setValue,
        clearErrors
    };
}