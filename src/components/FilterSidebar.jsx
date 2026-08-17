import { useFilterSideBarDetails } from "../hooks/useFilterSideBarDetails";

export default function FiltersSidebar() {

    const {  filterSidebar, setFilterSidebar, register, handleSubmit, setValue, watch, reset, setFilterObj, onSubmit } = useFilterSideBarDetails();

    

    return (
        <aside className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-1001 flex flex-col ${(filterSidebar) ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Настройки каталога</h2>
                <button onClick={() => setFilterSidebar(false)} type="button" aria-label="Закрыть" className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                <fieldset>
                    <legend className="font-bold text-base mb-3 text-gray-900">Сортировка</legend>
                    <select name="sort" defaultValue="default" {...register("sort")} className="w-full border border-gray-300 rounded-lg px-3 py-2.5
                     focus:outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer">
                        <option value="default">По умолчанию</option>
                        <option value="price-asc">Сначала дешевые</option>
                        <option value="price-desc">Сначала дорогие</option>
                        <option value="rating-desc">Высокий рейтинг</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend className="font-bold text-base mb-3 text-gray-900">Цена (₸)</legend>
                    <div className="flex gap-3">
                        <div className="w-1/2 flex flex-col gap-1">
                            <label htmlFor="price-min" className="text-sm text-gray-500">От</label>
                            <input
                                {...register("priceMin")}
                                type="number"
                                placeholder="0"
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col gap-1">
                            <label htmlFor="price-max" className="text-sm text-gray-500">До</label>
                            <input
                                {...register("priceMax")}
                                type="number"
                                placeholder="100000"
                                min="0"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="font-bold text-base mb-3 text-gray-900">Тип наушников</legend>
                    <div className="flex flex-col gap-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                {...register("type")}
                                type="checkbox"
                                value="wired-headphones"
                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                            />
                            <span className="text-base text-gray-700">Проводные</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                {...register("type")}
                                type="checkbox"
                                value="wireless-headphones"
                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                            />
                            <span className="text-base text-gray-700">Беспроводные</span>
                        </label>
                    </div>
                </fieldset>

                <div className="mt-auto pt-4 flex gap-3 border-t border-gray-200">
                    <button onClick={() => {
                        setFilterObj(null)
                        reset();
                    }} type="reset" className="w-1/2 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                        Сбросить
                    </button>
                    <button type="submit" className="w-1/2 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors shadow-sm">
                        Применить
                    </button>
                </div>
            </form>
        </aside>
    );
}