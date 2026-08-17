import desktopBg from "../assets/images/home-page/background-desktop.avif";
import smallBg from "../assets/images/home-page/background-small.avif";
import glassCase from "../assets/images/home-page/glass.webp";
import siliconeCase from "../assets/images/home-page/leather.webp";
import leatherCase from "../assets/images/home-page/silicone.webp";
import Loader from "../components/Loader";
import FiltersSidebar from "../components/FilterSidebar";
import { useContext, useMemo } from "react";

import { DataContext } from "../context/DataContext";
import { UIContext } from "../context/UIContext";
import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";

export default function HomePage() {

    const { products, isLoading, downloadInfo } = useContext(DataContext);

    const { setFilterSidebar } = useContext(UIContext);

    const groupedCategories = useMemo(() => {

        const objOfCategories = {
            "wireless-headphones": [],
            "wired-headphones": []
        }

        if (!products) return null;

        products.forEach((item) => {

            const category = item.category;

            if (objOfCategories[category]) {
                objOfCategories[category].push(item);
            }

        });

        return objOfCategories;

    }, [products]);

    if (isLoading) return <Loader />;


    if (!products) return (
        <main className="flex justify-center items-center max-w-330 container mx-auto grow ">
            <div className="flex flex-col text-center gap-2">
                <h1 className="text-3xl">Каталог повреждён!</h1>
                <p className="text-2xl">Попробуйте позже</p>
                <button onClick={() => downloadInfo()} className="p-2.5 cursor-pointer bg-[#0d6efd] hover:bg-[#0b5ed7] px-3 py-1.5 rounded-md text-white" type="button">Повторить попытку</button>
            </div>
        </main>
    )



    const { "wireless-headphones": wireless, "wired-headphones": wired } = groupedCategories;



    return (
        <main className="container mx-auto max-w-330 grow">

            <section className="mb-12 px-6">
                <picture>
                    <source media="(min-width: 992px)" srcSet={desktopBg} />
                    <source media="(min-width: 420px)" srcSet={smallBg} />
                    <img className="rounded-4xl w-full" src={smallBg}
                        alt="Аксессуары для iPhone 13 Pro Max" />
                </picture>
            </section>

            <section>
                <h2 className="text-[rgba(131,131,131,1)] text-2xl font-semibold mb-6 px-6">Чехлы</h2>
                <div className="py-4 flex flex-nowrap gap-6 overflow-auto px-6">

                    <div className="relative flex basis-[70%] md:basis-auto grow shrink-0 items-center p-4 flex-col bg-white rounded-4xl pt-6 transition-transform duration-100 hover:scale-[1.02]">
                        <img className="max-w-35.25 w-full max-h-61.5 object-contain mb-4" src={glassCase} alt="glass case" />
                        <h3 className="text-[#212529] font-bold mb-6 ">Стеклянные</h3>
                        <Link className="absolute z-10 inset-0 " to={"cases/glass"}></Link>
                    </div>

                    <div className="relative flex basis-[70%] md:basis-auto grow shrink-0 items-center p-4 flex-col bg-white rounded-4xl pt-6 transition-transform duration-100 hover:scale-[1.02]">
                        <img className="max-w-35.25 w-full max-h-61.5 object-contain mb-4" src={siliconeCase} alt="glass case" />
                        <h3 className="text-[#212529] font-bold mb-6">Силиконовые</h3>
                        <Link className="absolute z-10 inset-0 " to={"cases/silicone"}></Link>
                    </div>
                    <div className="relative flex basis-[70%] md:basis-auto grow shrink-0 items-center p-4 flex-col bg-white rounded-4xl pt-6 transition-transform duration-100 hover:scale-[1.02]">
                        <img className="max-w-35.25 w-full max-h-61.5 object-contain mb-4" src={leatherCase} alt="glass case" />
                        <h3 className="text-[#212529] font-bold mb-6">Кожаные</h3>
                        <Link className="absolute z-10 inset-0 " to={"cases/leather"}></Link>
                    </div>

                </div>

            </section>

            <div className="container flex justify-start px-6 mb-8">
                <button onClick={() => setFilterSidebar((prev) => !prev)} className="text-black bg-white font-bold p-2 rounded-4xl" type="button">⚙️Настройки каталога</button>
            </div>

            <CategorySection title={"Наушники"} items={wired} categoryType={"wired-headphones"} />

            <CategorySection title={"Беспроводные"} items={wireless} categoryType={"wireless-headphones"}  />

            <FiltersSidebar />

        </main>
    )

}

