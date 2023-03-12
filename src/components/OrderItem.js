import React from "react";
import orderItemCss from "./OrderItem.module.css";

const OrderItem = ({ product, quantity }) => {
    const { name, brand, price, images } = product;

    return (
        <div className={orderItemCss.cartItem}>
            <div
                className={orderItemCss.image}
                style={{ backgroundImage: `url(${images[0]})` }}
            ></div>
            <div className={orderItemCss.itemDetails}>
                <h6 className={orderItemCss.name}>{name}</h6>
                <p className={orderItemCss.brand}>{brand}</p>
                <p className={orderItemCss.prices}>
                    <span className={orderItemCss.original}>$ {price}</span>
                    <span className={orderItemCss.discounted}>$ {price}</span>
                </p>
                <p className={orderItemCss.prices}>
                    <span className={orderItemCss.discounted}>
                        QTY: {quantity}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OrderItem;
