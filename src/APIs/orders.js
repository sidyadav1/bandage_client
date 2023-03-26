import Axios from "./Axios";

export const placeOrder = ({ products, amount }) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "new_order",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
            data: JSON.stringify({ products, amount }),
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response));
    });
};

export const getOrders = () => {
    return new Promise((resolve, reject) => {
        Axios({
            url: "orders",
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
