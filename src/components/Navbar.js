import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import navbarCss from "./Navbar.module.css";
import userIcon from "../assets/userIcon.svg";
import userProfile from "../assets/user_profile.png";
import filledCart from "../assets/filledCart.svg";
import emptyCart from "../assets/emptyCart.svg";
import orders from "../assets/orders.svg";
import home from "../assets/home.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, cart } = useContext(UserContext);
    return (
        <header className={navbarCss.header}>
            <nav className={navbarCss.navbar}>
                <Link to={"/"} className={navbarCss.homeNav}>
                    <h1 className={navbarCss.logo}>Bandage</h1>
                </Link>
                <div className={navbarCss.navItems}>
                    {user ? (
                        <div className={navbarCss.userLinks}>
                            <Link to={"/profile"}>
                                <img
                                    src={userProfile}
                                    className={navbarCss.userProfile}
                                    alt="user"
                                />
                            </Link>
                            <Link
                                to={"/cart"}
                                className={navbarCss.userItemLinks}
                            >
                                {cart.length ? (
                                    <img
                                        src={filledCart}
                                        className={navbarCss.cart}
                                        alt="Go To Cart"
                                    />
                                ) : (
                                    <img
                                        src={emptyCart}
                                        className={navbarCss.cart}
                                        alt="Go To Cart"
                                    />
                                )}
                            </Link>
                            <Link
                                to={"/orders"}
                                className={navbarCss.userItemLinks}
                            >
                                <img
                                    src={orders}
                                    className={navbarCss.cart}
                                    alt="Go To Orders"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className={navbarCss.authLinks}>
                            <img
                                src={userIcon}
                                alt="user icon"
                                className={navbarCss.userLogo}
                            />
                            <Link className={navbarCss.authLink} to={"/login"}>
                                Login
                            </Link>{" "}
                            /
                            <Link
                                className={navbarCss.authLink}
                                to={"/registration"}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className={navbarCss.spacer}></div>
            <nav className={navbarCss.bottomNav}>
                {user ? (
                    <>
                        <Link to={"/"} className={navbarCss.userItemLinks}>
                            <img
                                src={home}
                                className={navbarCss.cart}
                                alt="Go To Home"
                            />
                        </Link>
                        <Link to={"/cart"} className={navbarCss.userItemLinks}>
                            {cart.length ? (
                                <img
                                    src={filledCart}
                                    className={navbarCss.cart}
                                    alt="Go To Cart"
                                />
                            ) : (
                                <img
                                    src={emptyCart}
                                    className={navbarCss.cart}
                                    alt="Go To Cart"
                                />
                            )}
                        </Link>
                        <Link
                            to={"/orders"}
                            className={navbarCss.userItemLinks}
                        >
                            <img
                                src={orders}
                                className={navbarCss.cart}
                                alt="Go To Orders"
                            />
                        </Link>
                        <Link to={"/profile"}>
                            <img
                                src={userProfile}
                                className={navbarCss.userProfile}
                                alt="user"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={"/"} className={navbarCss.userItemLinks}>
                            <img
                                src={home}
                                className={navbarCss.cart}
                                alt="Go To Home"
                            />
                        </Link>
                        <Link className={navbarCss.authLink} to={"/login"}>
                            Login
                        </Link>{" "}
                        <Link
                            className={navbarCss.authLink}
                            to={"/registration"}
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
