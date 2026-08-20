

export function DesktopOrderCartItem({item}) {

    const { title, quantity, UIprice, price } = item

    return (
        <div className="grid grid-cols-[30px_1fr_100px] items-start mb-3">
            <span className="cart-order-tablet-desktop-quantity font-medium self-start text-gray-500">
                {quantity}x
            </span>

            <div className="flex flex-col pr-2">
                <span className="cart-order-tablet-desktop-title font-medium">{title}</span>
                <span className="cart-order-tablet-desktop-price font-medium">{UIprice}</span>
            </div>

            <output className="cart-order-tablet-desktop-sum font-medium text-right self-start">
                ${(price * quantity).toFixed(2)}
            </output>
        </div>
    );
}