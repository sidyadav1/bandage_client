import { Link, useParams } from "react-router-dom";
import productCss from "./Product.module.css";
import forwardArrow from "../assets/forwardArrow.svg";
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../APIs/products";
import Loader from "../components/Loader";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import previous from "../assets/previous.svg";
import next from "../assets/next.svg";
import { addProductToCart } from "../APIs/cart";
import { ADD_CART_ITEM, ADD_TO_CART } from "../context/Action";
import { toast } from "react-toastify";

const Product = () => {
    const { id } = useParams();
    const { cart, user } = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({
        id: "",
        name: "",
        price: 0,
        images: [],
        description: "",
    });
    const [cover, setCover] = useState(0);
    const [alreadyInCart, setAlreadyInCart] = useState(false);

    useEffect(() => {
        setLoading(true);
        getProductById({ id })
            .then((result) => {
                setProduct(result.data);
            })
            .catch((error) => {
                setError("Product Not found");
            });
        setLoading(false);
    }, [id]);

    useEffect(() => {
        cart.every((item) => {
            if (item.productId === id) {
                setAlreadyInCart(true);
                return false;
            }
            return true;
        });
    }, [cart, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSetCover = (index) => {
        setCover(index);
    };

    const handleNext = () => {
        const newIndex = (cover + 1) % product.images.length;
        setCover(newIndex);
    };

    const handlePrevious = () => {
        var newIndex = cover - 1;
        if (newIndex < 0) {
            newIndex = product.images.length - 1;
        }

        setCover(newIndex);
    };

    const handleAddItemToCart = () => {
        const toastId = toast.loading("Adding product to your cart....");
        addProductToCart({ productId: id, quantity: 1 })
            .then((result) => {
                const response = result.data;
                const newProduct = {
                    name: product.name,
                    images: product.images,
                    price: product.price,
                    brand: product.brand,
                    ...response,
                };
                dispatch({
                    type: ADD_TO_CART,
                    product: newProduct,
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

    return (
        <div className={productCss.productPage}>
            <div className={productCss.navigation}>
                <div className={productCss.navigationContainer}>
                    <Link to={"/"} className={productCss.navPrevious}>
                        Home
                    </Link>{" "}
                    <img
                        src={forwardArrow}
                        alt="forward"
                        className={productCss.navSeparator}
                    />{" "}
                    <p className={productCss.navCurrent}>Shop</p>
                </div>
            </div>
            {loading ? (
                <div className={productCss.loader}>
                    <Loader />
                </div>
            ) : error ? (
                <div className={productCss.errorDiv}>
                    <p className={productCss.error}>{error}</p>
                </div>
            ) : (
                <div className={productCss.productContainer}>
                    <div className={productCss.images}>
                        <div
                            className={productCss.cover}
                            style={{
                                backgroundImage: `url(${product.images[cover]})`,
                            }}
                        >
                            <img
                                className={productCss.previous}
                                src={previous}
                                alt="previous"
                                onClick={handlePrevious}
                            />
                            <img
                                className={productCss.next}
                                src={next}
                                alt="next"
                                onClick={handleNext}
                            />
                        </div>
                        <div className={productCss.coveroptions}>
                            {product.images.map((image, index) => {
                                return (
                                    <span
                                        key={image}
                                        className={`${productCss.options} ${
                                            cover === index
                                                ? productCss.selected
                                                : ""
                                        }`}
                                        style={{
                                            backgroundImage: `url(${image})`,
                                        }}
                                        onClick={() => handleSetCover(index)}
                                    ></span>
                                );
                            })}
                        </div>
                    </div>
                    <div className={productCss.details}>
                        <h5 className={productCss.name}>{product.name}</h5>
                        <p className={productCss.price}>$ {product.price}</p>
                        <p className={productCss.availability}>
                            Availability: <span>In Stock</span>
                        </p>
                        <p className={productCss.description}>
                            {product.description}
                        </p>
                        {user ? (
                            alreadyInCart ? (
                                <Link to={"/cart"}>
                                    <button className={productCss.addToCart}>
                                        Go To Cart
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={handleAddItemToCart}
                                    className={productCss.addToCart}
                                >
                                    Add To Cart
                                </button>
                            )
                        ) : (
                            <p className={productCss.notLogged}>
                                You're not logged in. Please{" "}
                                <Link
                                    className={productCss.authLinks}
                                    to={"/login"}
                                >
                                    Login
                                </Link>{" "}
                                /{" "}
                                <Link
                                    className={productCss.authLinks}
                                    to={"/registration"}
                                >
                                    Register
                                </Link>{" "}
                                to add items to your cart.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
