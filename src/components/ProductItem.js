import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../APIs/cart";
import { ADD_CART_ITEM, ADD_TO_CART } from "../context/Action";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import productCss from "./ProductItem.module.css";
import { toast } from "react-toastify";

const Product = ({ product }) => {
    const { id, name, images, price, brand } = product;
    const { cart, user } = useContext(UserContext);
    const [inCart, setInCart] = useState(false);

    const dispatch = useContext(UserDispatchContext);

    const handleAddItemToCart = () => {
        const toastId = toast.loading("Adding product to your cart....");
        addProductToCart({ productId: id, quantity: 1 })
            .then((result) => {
                const response = result.data;
                const product = {
                    name,
                    images,
                    price,
                    brand,
                    ...response,
                };
                dispatch({
                    type: ADD_TO_CART,
                    product,
                });
                dispatch({
                    type: ADD_CART_ITEM,
                    id,
                });
                toast.update(toastId, {
                    render: "Product added to your cart",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    closeOnClick: true,
                });
            })
            .catch((error) => {
                toast.update(toastId, {
                    render: "Couldn't add product to your cart",
                    type: "error",
                    isLoading: false,
                    autoClose: 4000,
                    closeOnClick: true,
                });
            });
    };

    useEffect(() => {
        const checkInCart = () => {
            setInCart(false);
            cart.every((item) => {
                if (item.productId === id) {
                    setInCart(true);
                    return false;
                }
                return true;
            });
        };
        checkInCart();
    }, [cart, id]);

    return (
        <div className={productCss.product}>
            <div
                className={productCss.productImage}
                style={{ backgroundImage: `url(${images[0]})` }}
            ></div>
            <div className={productCss.details}>
                <Link className={productCss.itemLink} to={`/product/${id}`}>
                    <h5 className={productCss.name}>{name}</h5>
                </Link>
                <p className={productCss.brand}>{brand}</p>
                <p className={productCss.prices}>
                    <span className={productCss.originalPrice}>$ {price}</span>
                    <span className={productCss.discountPrice}>$ {price}</span>
                </p>
            </div>
            {user ? (
                inCart ? (
                    <Link to={"/cart"} className={productCss.goToCart}>
                        <p className={productCss.addToCart}>Go To Cart</p>
                    </Link>
                ) : (
                    <p
                        className={productCss.addToCart}
                        onClick={handleAddItemToCart}
                    >
                        Add To Cart
                    </p>
                )
            ) : (
                <p className={productCss.authLinks}>
                    {/* <Link to={"/login"} className={productCss.auth}>
                        Login
                    </Link>{" "}
                    /{" "}
                    <Link to={"/registration"} className={productCss.auth}>
                        Register
                    </Link> */}
                    You're not logged into your account. Please login or create
                    a new account.
                </p>
            )}
        </div>
    );
};

export default Product;
