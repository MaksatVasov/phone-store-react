import { createContext, useState } from "react";
import { defaultErrorState } from "../helpers/errorHelpers.js";

export const UIContext = createContext(null);

export function UIProvider({ children }) {

    const [error, setError] = useState(defaultErrorState())

    const [sidebar, setSidebar] = useState(false);


    
    return (
        <UIContext.Provider value={{setError, error, sidebar, setSidebar}}>
            {children}
        </UIContext.Provider>
    )
}
