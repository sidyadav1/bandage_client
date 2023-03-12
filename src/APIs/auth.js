import Axios from "./Axios";

export const register = (user) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "registration",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify(user),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};

export const login = (user) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "login",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify(user),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};

export const getUser = () => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "me",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};
