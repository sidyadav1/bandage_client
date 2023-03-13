import { useContext, useState } from "react";
import { removeCartItem, updateQuantity } from "../APIs/cart";
import { DELETE_CART_ITEM, UPDATE_ITEM_QUANTITY } from "../context/Action";
import { UserDispatchContext } from "../context/UserContext";
import cartItemCss from "./CartItem.module.css";
import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
    const dispatch = useContext(UserDispatchContext);

    const { id, name, brand, price, images } = cartItem;
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const handleQuantityChange = (e) => {
        const tempQuantity = e.target.value;

        updateQuantity({ id, quantity: tempQuantity }).then(() => {
            setQuantity(tempQuantity);
            dispatch({
                type: UPDATE_ITEM_QUANTITY,
                id,
                item: { ...cartItem, quantity: tempQuantity },
            });
        });
    };

    const handleRemoveProduct = () => {
        const toastId = toast.loading("Removing item from the cart!!");
        removeCartItem({ id })
            .then(() => {
                dispatch({
                    type: DELETE_CART_ITEM,
                    id,
                });
                toast.update(toastId, {
                    render: "Item successfully removed from cart",
                    isLoading: false,
                    type: "success",
                    autoClose: 4000,
                    closeOnClick: true,
                });
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Couldn't item from cart from cart",
                    isLoading: false,
                    type: "error",
                    autoClose: 4000,
                    closeOnClick: true,
                });
            });
    };

    return (
        <div className={cartItemCss.cartItem}>
            <div
                className={cartItemCss.image}
                style={{ backgroundImage: `url(${images[0]})` }}
            ></div>
            <div className={cartItemCss.itemDetails}>
                <h6 className={cartItemCss.name}>{name}</h6>
                <p className={cartItemCss.brand}>{brand}</p>
                <p className={cartItemCss.prices}>
                    <span className={cartItemCss.original}>$ {price}</span>
                    <span className={cartItemCss.discounted}>$ {price}</span>
                </p>
                <div className={cartItemCss.itemOptions}>
                    <select
                        className={cartItemCss.quantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                    >
                        <option value={1}>QTY: 1</option>
                        <option value={2}>QTY: 2</option>
                        <option value={3}>QTY: 3</option>
                        <option value={4}>QTY: 4</option>
                        <option value={5}>QTY: 5</option>
                    </select>
                    <button
                        className={cartItemCss.delete}
                        onClick={handleRemoveProduct}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
