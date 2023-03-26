import { Link } from "react-router-dom";
import cartCss from "./Cart.module.css";
import forwardArrow from "../assets/forwardArrow.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import CartItem from "../components/CartItem";
import { placeOrder } from "../APIs/orders";
import { EMPTY_CART, FILL_CART } from "../context/Action";
import empty from "../assets/empty.png";
import success from "../assets/success.svg";
import fail from "../assets/fail.svg";
import backArrow from "../assets/backArrow.svg";
import Loader from "../components/Loader";
import doubleForward from "../assets/doubleForward.svg";

const Cart = () => {
    const { cart } = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext);

    const [total, setTotal] = useState(0);
    const [orderMade, setOrderMade] = useState(false);
    const [orderStatus, setOrderStatus] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderTransaction, setOrderTransaction] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let tempTotal = cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0.0);
        setTotal(tempTotal);
    }, [cart]);

    const handlePlaceOrder = () => {
        if (total <= 0.0) {
            return;
        }

        setOrderLoading(true);
        setOrderMade(true);
        const products = cart.reduce((acc, item) => {
            acc.push({ id: item.productId, quantity: item.quantity });
            return acc;
        }, []);

        placeOrder({ products, amount: total })
            .then((result) => {
                setOrderTransaction(result.data.id);
                dispatch({ type: EMPTY_CART });
                setOrderStatus(true);
            })
            .catch((result) => {
                if (result.status === 409) {
                    dispatch({
                        type: FILL_CART,
                        cart:
                            (Array.isArray(result.data.data) &&
                                result.data.data) ||
                            [],
                    });
                }
                setOrderStatus(false);
            })
            .finally(() => {
                setOrderLoading(false);
            });
    };

    const MakeOrder = () => {
        return (
            <div className={cartCss.cartContainer}>
                <div className={cartCss.cartItems}>
                    {cart.length ? (
                        cart.map((item) => {
                            return <CartItem key={item.id} cartItem={item} />;
                        })
                    ) : (
                        <div className={cartCss.emptyCart}>
                            <img src={empty} alt="Empty cart" />
                        </div>
                    )}
                </div>
                <div className={cartCss.payment}>
                    <h1 className={cartCss.paymentHeader}>Order Summary</h1>
                    <div className={cartCss.orderDetails}>
                        <p className={cartCss.orderDetailsTitle}>Order Value</p>
                        <p className={cartCss.orderDetailsValue}>
                            $ {parseInt(total)}{" "}
                            <sup>
                                {(total - parseInt(total)).toPrecision(2) * 100}
                            </sup>
                        </p>
                    </div>
                    <div className={cartCss.orderDetails}>
                        <p className={cartCss.orderDetailsTitle}>VAT</p>
                        <p className={cartCss.orderDetailsValue}>$ 8</p>
                    </div>
                    <div className={cartCss.orderDetails}>
                        <p className={cartCss.orderDetailsTitle}>
                            Total Before Discount
                        </p>
                        <p className={cartCss.orderDetailsValue}>
                            $ {parseInt(total)}{" "}
                            <sup>
                                {(total - parseInt(total)).toPrecision(2) * 100}
                            </sup>
                        </p>
                    </div>
                    <hr />
                    <div className={cartCss.orderTotal}>
                        <p className={cartCss.orderTotalTitle}>Total</p>
                        <p className={cartCss.orderTotalValue}>
                            $ {parseInt(total)}{" "}
                            <sup>
                                {(total - parseInt(total)).toPrecision(2) * 100}
                            </sup>
                        </p>
                    </div>
                    <button
                        className={cartCss.placeOrder}
                        onClick={handlePlaceOrder}
                        disabled={!cart.length}
                    >
                        Place Order <img src={doubleForward} alt={"forward"} />
                    </button>
                    <p className={cartCss.customOrderHint}>
                        *Custom orders need a few working days to be created.
                        More info here
                    </p>
                </div>
            </div>
        );
    };

    const OrderSuccess = () => {
        return (
            <div className={cartCss.statusContainer}>
                <div className={cartCss.statusDetails}>
                    <div className={cartCss.orderSuccessImg}>
                        <img src={success} alt="successful" />
                    </div>
                    <h3 className={cartCss.thanksMessage}>Thank You !</h3>
                    <p className={cartCss.statusmessage}>
                        Your Order has been placed successfully
                    </p>
                    <p className={cartCss.transaction}>
                        Transaction Number : <bold>{orderTransaction}</bold>
                    </p>
                    <Link to={"/"} className={cartCss.backToHome}>
                        <img src={backArrow} alt="back arrow" /> Back To Home
                    </Link>
                </div>
            </div>
        );
    };

    const OrderFailed = () => {
        return (
            <div className={cartCss.statusContainer}>
                <div className={cartCss.statusDetails}>
                    <div className={cartCss.orderFailImg}>
                        <img src={fail} alt="fail" />
                    </div>
                    <h3 className={cartCss.thanksMessage}>Sorry !</h3>
                    <p className={cartCss.statusmessage}>
                        Your Order has failed
                    </p>

                    <Link to={"/"} className={cartCss.backToHome}>
                        <img src={backArrow} alt="back arrow" /> Back To Home
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className={cartCss.cartPage}>
            <div className={cartCss.navigation}>
                <div className={cartCss.navigationContainer}>
                    <Link to={"/"} className={cartCss.navPrevious}>
                        Home
                    </Link>{" "}
                    <img
                        src={forwardArrow}
                        alt="forward"
                        className={cartCss.navSeparator}
                    />{" "}
                    <p className={cartCss.navCurrent}>My Cart</p>
                </div>
            </div>
            <div className={cartCss.cart}>
                {orderMade ? (
                    orderLoading ? (
                        <div className={cartCss.loader}>
                            <Loader />
                            <p className={cartCss.orderProcessMsg}>
                                Placing your order, please wait.
                            </p>
                        </div>
                    ) : orderStatus ? (
                        <OrderSuccess />
                    ) : (
                        <OrderFailed />
                    )
                ) : (
                    <MakeOrder />
                )}
            </div>
        </div>
    );
};

export default Cart;
