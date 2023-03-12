import { createContext, useReducer } from "react";
import { initialState, userReducer } from "./Reducer";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const UserProvider = ({ children }) => {
    const [userItems, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={userItems}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
};
