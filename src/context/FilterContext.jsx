import { createContext, useState } from "react";

export const FilterContext = createContext(null);

export default function FilterProvider({children}){

    const [filterObj, setFilterObj] = useState(null);

    return(
        <FilterContext.Provider value={{filterObj, setFilterObj}}>
            {children}
        </FilterContext.Provider>
    )

}