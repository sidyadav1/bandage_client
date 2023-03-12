import Axios from "./Axios";

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        Axios({
            url: `products`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};

export const getProductById = ({ id }) => {
    return new Promise((resolve, reject) => {
        Axios({
            url: `products/${id}`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": true,
            },
        })
            .then((result) => resolve(result.data))
            .catch((error) => reject(error.response.data));
    });
};
