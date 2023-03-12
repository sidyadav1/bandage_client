import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../APIs/auth";
import Loader from "../components/Loader";
import { SET_USER } from "../context/Action";
import { UserDispatchContext } from "../context/UserContext";
import { validateEmail } from "../helpers/validation";
import authCss from "./Auth.module.css";

const Login = () => {
    const dispatch = useContext(UserDispatchContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        const tempEmail = e.target.value.trim();
        if (validateEmail(tempEmail)) {
            setEmailError(null);
        } else {
            setEmailError("Enter a valiad email address");
        }
        setEmail(tempEmail);
    };

    const handlePasswordChange = (e) => {
        const tempPassword = e.target.value.trim();
        if (!tempPassword) {
            setPasswordError("Password is required.");
        } else {
            setPasswordError(null);
        }
        setPassword(tempPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email) && password) {
            setIsLoading(true);
            const user = {
                email: email.trim(),
                password: password.trim(),
            };

            login(user)
                .then((response) => {
                    const { user, token } = response.data;
                    dispatch({
                        type: SET_USER,
                        user,
                    });
                    localStorage.setItem("auth_token", token);
                    navigate("/");
                })
                .catch((error) => {
                    setAuthError(error.message);
                });

            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={authCss.loginPage}>
            <div className={authCss.loginForm}>
                <h1 className={authCss.header}>
                    Welcome back to <br />
                    bandage
                </h1>
                {authError ? (
                    <p className={authCss.authErrorMessage}>{authError}</p>
                ) : (
                    <></>
                )}
                <form className={authCss.form} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={authCss.inputLabel}>
                        Email <strong className={authCss.required}>*</strong>
                    </label>
                    <input
                        value={email}
                        onChange={handleEmailChange}
                        id="email"
                        className={authCss.input}
                        type={"email"}
                        placeholder="Enter your email"
                    />
                    {emailError ? (
                        <p className={authCss.error}>{emailError}</p>
                    ) : (
                        ""
                    )}
                    <label htmlFor="password" className={authCss.inputLabel}>
                        Password <strong className={authCss.required}>*</strong>
                    </label>
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        id="password"
                        className={authCss.input}
                        type={"password"}
                        placeholder="Enter your password"
                    />
                    {passwordError ? (
                        <p className={authCss.error}>{passwordError}</p>
                    ) : (
                        ""
                    )}
                    <p className={authCss.forgotPassword}>Forgot Password</p>
                    {isLoading ? (
                        <div className={authCss.loaderContainer}>
                            <Loader />
                        </div>
                    ) : (
                        <input
                            type={"submit"}
                            className={authCss.submitButtom}
                            value="Login"
                        />
                    )}
                </form>
                <p className={authCss.authAlternate}>
                    New user ?{" "}
                    <Link to={"/registration"} replace>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
