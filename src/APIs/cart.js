import Axios from "./Axios";

export const addProductToCart = ({ productId, quantity = 1 }) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "add_to_cart",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify({ productId, quantity }),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};

export const getUserCart = () => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "user_cart",
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

export const updateQuantity = ({ id, quantity }) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "update_quantity",
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify({ id, quantity }),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};

export const removeCartItem = ({ id }) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "remove_item",
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify({ id }),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};
