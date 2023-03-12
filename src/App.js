import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import { useContext, useEffect, useState } from "react";
import { UserDispatchContext } from "./context/UserContext";
import { getUser } from "./APIs/auth";
import { FILL_CART, SET_USER } from "./context/Action";
import Loader from "./components/Loader";
import { getUserCart } from "./APIs/cart";
import Auth from "./routes/Auth";
import Product from "./pages/Product";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
    const dispatch = useContext(UserDispatchContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = () => {
            setIsLoading(true);

            getUser().then((result) => {
                dispatch({
                    type: SET_USER,
                    user: result.data,
                });
            });
            getUserCart().then((result) => {
                const cart = result.data;
                dispatch({
                    type: FILL_CART,
                    cart: cart,
                });
            });
            setIsLoading(false);
        };

        fetchUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <div className="loader_container">
                    <Loader />
                </div>
            ) : (
                <>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <Auth>
                                    <Login />
                                </Auth>
                            }
                        />
                        <Route
                            path="/registration"
                            element={
                                <Auth>
                                    <Registration />
                                </Auth>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Protected>
                                    <Profile />
                                </Protected>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <Protected>
                                    <Cart />
                                </Protected>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <Protected>
                                    <Orders />
                                </Protected>
                            }
                        />
                        <Route
                            path="/product/:id"
                            element={
                                <Public>
                                    <Product />
                                </Public>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Public>
                                    <Home />
                                </Public>
                            }
                        />
                    </Routes>
                    <Footer />
                </>
            )}
            <ToastContainer autoClose={4000} position="bottom-right" />
        </div>
    );
}

export default App;
