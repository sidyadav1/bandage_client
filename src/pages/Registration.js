import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../APIs/auth";
import Loader from "../components/Loader";
import { SET_USER } from "../context/Action";
import { UserDispatchContext } from "../context/UserContext";
import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword,
    validatePhone,
} from "../helpers/validation";
import authCss from "./Auth.module.css";

const Registration = () => {
    const dispatch = useContext(UserDispatchContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEmailChange = (e) => {
        const tempEmail = e.target.value.trim();
        if (validateEmail(tempEmail)) {
            setEmailError(null);
        } else {
            setEmailError("Enter a valiad email address");
        }
        setEmail(tempEmail);
    };

    const handleNameChange = (e) => {
        const tempName = e.target.value;
        if (!tempName) {
            setNameError("Name is required.");
            setName(tempName);
            return;
        }
        if (validateName(tempName)) {
            setName(tempName);
            setNameError(null);
        }
    };

    const handlePhoneChange = (e) => {
        const tempPhone = e.target.value.trim();
        if (!tempPhone) {
            setPhone(tempPhone);
            setPhoneError("Phone number is required.");
            return;
        }
        if (validatePhone(tempPhone)) {
            setPhoneError(null);
        } else {
            setPhoneError("Enter a valid phone number");
        }
        setPhone(tempPhone);
    };

    const handlePasswordChange = (e) => {
        const tempPassword = e.target.value.trim();
        if (validatePassword(tempPassword)) {
            setPasswordError(null);
        } else {
            setPasswordError(
                "Password should be minimum 8 charcters long.\nPassword must contain atleast one uppercase, one lowercase, one number and one special character"
            );
        }
        setPassword(tempPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const tempConfirmPassword = e.target.value.trim();
        if (validateConfirmPassword(password, tempConfirmPassword)) {
            setConfirmPasswordError(null);
        } else {
            setConfirmPasswordError(
                "Confirm password should be same as password"
            );
        }
        setConfirmPassword(tempConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            validateEmail(email) &&
            validateName(name) &&
            validatePhone(phone) &&
            validatePassword(password) &&
            validateConfirmPassword(password, confirmPassword)
        ) {
            setIsLoading(true);
            const user = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password: password.trim(),
            };
            register(user)
                .then((response) => {
                    const { user, token } = response.data;
                    dispatch({
                        type: SET_USER,
                        user,
                    });
                    localStorage.setItem("auth_token", token);
                    toast("Account created successfully");
                    navigate("/");
                })
                .catch((error) => {
                    setAuthError(error.message);
                });

            setIsLoading(false);
        }
    };

    return (
        <div className={authCss.loginPage}>
            <div className={authCss.loginForm}>
                <h1 className={authCss.header}>Register Your Account</h1>
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
                        placeholder="xxx@gmail.com"
                    />
                    {emailError ? (
                        <p className={authCss.error}>{emailError}</p>
                    ) : (
                        ""
                    )}
                    <label htmlFor="name" className={authCss.inputLabel}>
                        Your Name{" "}
                        <strong className={authCss.required}>*</strong>
                    </label>
                    <input
                        value={name}
                        onChange={handleNameChange}
                        id="name"
                        className={authCss.input}
                        type={"text"}
                        placeholder="Enter your name"
                    />
                    {nameError ? (
                        <p className={authCss.error}>{nameError}</p>
                    ) : (
                        ""
                    )}
                    <label htmlFor="phone" className={authCss.inputLabel}>
                        Phone Number{" "}
                        <strong className={authCss.required}>*</strong>
                    </label>
                    <input
                        value={phone}
                        onChange={handlePhoneChange}
                        id="phone"
                        className={authCss.input}
                        type={"tel"}
                        maxLength={10}
                        placeholder="9999999999"
                    />
                    {phoneError ? (
                        <p className={authCss.error}>{phoneError}</p>
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
                        placeholder="Create a password"
                    />
                    {passwordError ? (
                        <p className={authCss.error}>{passwordError}</p>
                    ) : (
                        ""
                    )}
                    <label
                        htmlFor="confirm_password"
                        className={authCss.inputLabel}
                    >
                        Confirm Password{" "}
                        <strong className={authCss.required}>*</strong>
                    </label>
                    <input
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        id="confirm_password"
                        className={authCss.input}
                        type={"password"}
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordError ? (
                        <p className={authCss.error}>{confirmPasswordError}</p>
                    ) : (
                        ""
                    )}
                    {isLoading ? (
                        <div className={authCss.loaderContainer}>
                            <Loader />
                        </div>
                    ) : (
                        <input
                            type={"submit"}
                            className={authCss.submitButtom}
                            value="Register"
                        />
                    )}
                </form>
                <p className={authCss.authAlternate}>
                    Already Registered ?{" "}
                    <Link to={"/login"} replace>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
