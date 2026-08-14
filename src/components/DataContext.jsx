import { createContext, useEffect, useState } from "react";
import { downloadProducts } from "../api/productsAPI.js";
export const DataContext = createContext(null);

export default function DataProvider({ children }) {

    const [products, setProducts] = useState(null);

    const [isLoading, setLoading] = useState(true);

    const downloadInfo = async () => {

        try {
            setLoading(true);
            const data = await downloadProducts();

            setProducts(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        downloadInfo();

    }, []);

    return (
        <DataContext.Provider value={{ products, downloadInfo, isLoading, setLoading }}>
            {children}
        </DataContext.Provider>
    )

}