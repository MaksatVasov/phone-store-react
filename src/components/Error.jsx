import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UIContext } from "./UIContext";
import { DataContext } from "./DataContext.jsx";
import { defaultErrorState } from "../helpers/errorHelpers.js";
export default function ErrorWindow() {

    const { error, setError } = useContext(UIContext);
    const { downloadInfo } = useContext(DataContext);

    const dialogRef = useRef(null);



    return (
        <dialog open={error.isErrorOpen} ref={dialogRef} className=" bg-gray-900/90 fixed top-0 z-1001 text-white backdrop-blur-smw-[95%] w-full h-full p-0 rounded-xl border border-white/10 shadow-2xl backdrop:bg-black/60">
            <div className="w-[95%] min-[576px]:w-[75%] min-[992px]:w-[25%] fixed  top-10 left-1/2 -translate-x-1/2 flex flex-col bg-white min-h-40 border border-[rgba(0,0,0,0.175)] rounded-lg">
                <div className="border-b border-[#dee2e6] p-4">
                    <h5 className="leading-normal text-[1.25rem] text-black">Ошибка</h5>
                </div>
                <div className="border-b border-[#dee2e6] p-4">
                    <p className="text-black">{error.message}</p>
                </div>
                <div className="flex flex-wrap justify-end gap-1 p-3 ">
                    <button type="button" onClick={() => {
                        setError(defaultErrorState());
                        downloadInfo();
                    }} className="cursor-pointer bg-[#6c757d] hover:bg-[#5c636a] px-3 py-1.5 rounded-md text-white">
                        Обновить
                    </button>
                    <Link to="/" onClick={() => setError(defaultErrorState())} className="cursor-pointer bg-[#0d6efd] hover:bg-[#0b5ed7] px-3 py-1.5 rounded-md text-white">
                        На главную
                    </Link>
                </div>
            </div>
        </dialog>
    )
}