import { Link, useNavigate } from "react-router-dom";
import profileCss from "./Profile.module.css";
import forwardArrow from "../assets/forwardArrow.svg";
import userProfile from "../assets/user_profile.png";
import { useContext, useEffect } from "react";
import { UserContext, UserDispatchContext } from "../context/UserContext";
import { LOGOUT_USER } from "../context/Action";
import { toast } from "react-toastify";

const Profile = () => {
    const navigate = useNavigate();

    const dispatch = useContext(UserDispatchContext);
    const { user } = useContext(UserContext);

    const handleUserLogout = () => {
        dispatch({
            type: LOGOUT_USER,
        });
        localStorage.setItem("auth_token", null);
        toast("Logged out successfully", {
            type: "success",
            closeOnClick: true,
            isLoading: false,
        });
        navigate("/");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={profileCss.profilePage}>
            <div className={profileCss.navigation}>
                <div className={profileCss.navigationContainer}>
                    <Link to={"/"} className={profileCss.navPrevious}>
                        Home
                    </Link>{" "}
                    <img
                        src={forwardArrow}
                        alt="forward"
                        className={profileCss.navSeparator}
                    />{" "}
                    <p className={profileCss.navCurrent}>Profile</p>
                </div>
            </div>
            <div className={profileCss.profile}>
                <div className={profileCss.profileContainer}>
                    <img
                        className={profileCss.userPicture}
                        src={userProfile}
                        alt="user"
                    />
                    <div className={profileCss.userDetails}>
                        <h5 className={profileCss.name}>{user.name}</h5>
                        <p className={profileCss.email}>{user.email}</p>
                        <p className={profileCss.phone}>+91 - {user.phone}</p>
                        <p
                            className={profileCss.logout}
                            onClick={handleUserLogout}
                        >
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
