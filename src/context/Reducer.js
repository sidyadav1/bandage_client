import {
    ADD_TO_CART,
    DELETE_CART_ITEM,
    EMPTY_CART,
    FILL_CART,
    LOGOUT_USER,
    SET_USER,
    UPDATE_ITEM_QUANTITY,
} from "./Action";

export const initialState = {
    user: null,
    cart: [],
    cartProducts: {},
    orders: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return { ...state, user: action.user };
        }
        case FILL_CART: {
            return { ...state, cart: action.cart };
        }
        case LOGOUT_USER: {
            return { user: null, cart: [], orders: [], cartProducts: {} };
        }
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.product],
            };
        }
        case UPDATE_ITEM_QUANTITY: {
            const newCart = state.cart.map((item) => {
                if (item.id === action.id) {
                    return action.item;
                }
                return item;
            });
            return {
                ...state,
                cart: newCart,
            };
        }
        case DELETE_CART_ITEM: {
            const newCart = state.cart.filter((item) => {
                return item.id !== action.id;
            });
            return { ...state, cart: newCart };
        }
        case EMPTY_CART: {
            return { ...state, cart: [] };
        }
        default: {
            return state;
        }
    }
};
