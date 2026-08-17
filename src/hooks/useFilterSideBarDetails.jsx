import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { useForm } from "react-hook-form";
import { FilterContext } from "../context/FilterContext";



export function useFilterSideBarDetails() {

    const { filterSidebar, setFilterSidebar } = useContext(UIContext);
    const { filterObj, setFilterObj } = useContext(FilterContext);

    const { register, handleSubmit, setValue, watch, reset} = useForm({
        defaultValues: {
            priceMin: "",
            priceMax: "",
            type: [],
            sort: "default",

        },
        mode: "onSubmit"
    });

    const onSubmit = (data) => {


        console.log(data)
        setFilterObj(data);

    }


    console.log(filterObj);


    return { filterSidebar, setFilterSidebar, register, handleSubmit, setValue, watch, onSubmit, setFilterObj, reset};
}
