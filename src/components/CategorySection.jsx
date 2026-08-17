import { useContext } from "react"
import { FilterContext } from "../context/FilterContext"
import CatalogItem from "./CatalogItem";

const objOfsort = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "rating-desc": (a, b) => b.rating - a.rating
}

export default function CategorySection({title, items, categoryType}) {

    const { filterObj } = useContext(FilterContext);


    if (!filterObj) return (
        <section>
            <h3 className="text-[rgba(131,131,131,1)] text-2xl font-semibold mb-6 px-6" >{title}</h3>
            <div className="flex flex-nowrap lg:flex-wrap overflow-auto px-6 py-4">
                {items.map((item) => <CatalogItem key={item.id} item={item} />)}
            </div>
        </section>
    )


    const { priceMax, priceMin, sort, type } = filterObj;

    const isCategorySelected = type.length === 0 || type.includes(categoryType);

    if (!isCategorySelected) return null;

    let filteredItems = items.filter((item) => {

        const max = priceMax ? Number(priceMax) : Infinity;
        const min = priceMin ? Number(priceMin) : 0;
        return item.price >= min && item.price <= max;

    });

    if (sort !== "default") {

        const func = objOfsort[sort];

        filteredItems.sort((a, b) => func(a, b));

    }


    return (
        <section>
            <h3 className="text-[rgba(131,131,131,1)] text-2xl font-semibold mb-6 px-6">{title}</h3>
            <div className="flex flex-nowrap lg:flex-wrap overflow-auto px-6 py-4">
                {filteredItems.map((item) => <CatalogItem key={item.id} item={item} />)}
            </div>
        </section>
    )

}