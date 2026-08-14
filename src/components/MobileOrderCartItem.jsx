
export function MobileOrderCartItem({ item}) {
    const { img, title, quantity, UIprice, price } = item;
    return (
        <div className="grid grid-cols-[50px_1fr_100px] gap-1.5 items-center mb-3">
            <img
                className="cart-product-img w-13.75 h-11 object-contain"
                src={`/images/${img}`}
                alt={title}
            />

            <div className="flex flex-col pr-2">
                <p className="m-0 font-medium break-all">
                    <span className="cart-product-quantity font-medium mr-1">{quantity}x</span>
                    <span className="cart-product-name font-medium">{title}</span>
                </p>
                <p className="cart-product-price m-0 font-medium">{price}</p>
            </div>

            <output className="cart-product-sum font-bold self-start break-all text-right">
                {price * quantity} ₸
            </output>
        </div>
    );
}