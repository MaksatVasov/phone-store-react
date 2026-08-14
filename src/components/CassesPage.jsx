import { useContext, useMemo, useState } from "react";
import { DataContext } from "./DataContext";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

import CatalogItem from "./CatalogItem";

export default function CassesPage() {

    const { products, isLoading } = useContext(DataContext);
    const { type } = useParams();

    if (isLoading) return <Loader />


    const curCatagory = products.filter((item) => item?.type === type);



    if (!products) return (
        <main className="flex justify-center items-center grow container mx-auto max-w-330">
            <div className="flex flex-col text-center gap-2">
                <h1 className="text-3xl">Такого товара нет!</h1>
                <p className="text-2xl">Попробуйте позже</p>
                <div className="flex gap-1">
                    <button onClick={() => downloadInfo()} className="p-2.5 cursor-pointer bg-[#6c757d] hover:bg-[#5c636a] px-3 py-1.5 rounded-md text-white" type="button">Повторить попытку</button>
                    <Link to="/" className="cursor-pointer bg-[#0d6efd] hover:bg-[#0b5ed7] px-3 py-1.5 rounded-md text-white">
                        На главную
                    </Link>
                </div>
            </div>

        </main>
    )

    return (
        <main className="container mx-auto max-w-330 grow">

            <section>
                <h2 className="text-[rgba(131,131,131,1)] text-2xl font-semibold mb-6 px-6">Чехлы для телефонов</h2>

                <div className="flex flex-nowrap lg:flex-wrap overflow-auto px-6 py-4">
                    {curCatagory.map((item) => <CatalogItem key={item.id} item={item}/>)}
                </div>
            </section>

        </main>
    )



}