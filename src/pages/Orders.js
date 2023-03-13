import ordersCss from "./Orders.module.css";
import forwardArrow from "../assets/forwardArrow.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders } from "../APIs/orders";
import OrderItem from "../components/OrderItem";
import Loader from "../components/Loader";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders()
            .then((result) => {
                const data = result.data;
                setProducts(data.products);
                setOrders(data.orders);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getDay = (date) => {
        const day = new Date(parseInt(date)).toString().substring(0, 24);
        return day;
    };

    return (
        <div className={ordersCss.orderPage}>
            <div className={ordersCss.navigation}>
                <div className={ordersCss.navigationContainer}>
                    <Link to={"/"} className={ordersCss.navPrevious}>
                        Home
                    </Link>{" "}
                    <img
                        src={forwardArrow}
                        alt="forward"
                        className={ordersCss.navSeparator}
                    />{" "}
                    <p className={ordersCss.navCurrent}>My Orders</p>
                </div>
            </div>
            <div className={ordersCss.ordersContainer}>
                {isLoading ? (
                    <div className={ordersCss.loaderContainer}>
                        <Loader />
                    </div>
                ) : orders.length === 0 ? (
                    <div className={ordersCss.noOrders}>
                        <p className={ordersCss.noOrdersText}>
                            ~You haven't placed any orders yet~
                        </p>
                    </div>
                ) : (
                    orders.map((order) => {
                        return (
                            <div key={order.id} className={ordersCss.order}>
                                <h5 className={ordersCss.orderDate}>
                                    {getDay(order.createdAt)}
                                </h5>
                                {/* <p className={ordersCss.id}>
                                    Order Id: <span>{order.id}</span>
                                </p> */}
                                <p className={ordersCss.total}>
                                    Order Total: <span>$ {order.amount}</span>
                                </p>
                                {order.products.map((product) => {
                                    return (
                                        <OrderItem
                                            key={product.id}
                                            quantity={product.quantity}
                                            product={products[product.id]}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Orders;
