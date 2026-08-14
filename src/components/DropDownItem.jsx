import { useState } from "react";
import ModelItem from "./ModelItem";

export default function DropDownItem({ phone }) {

    const [isOpen, setOpen] = useState(false);


    const { brand, models } = phone;

    return (

        <li onClick={() => setOpen((prev) => !prev)} className="bg-transparent cursor-pointer m-1">
            <div className="flex justify-between items-center">{brand}<span
                className={`${(isOpen) ? "rotate-180" : "rotate-0"} transition-transform duration-300`}>&#9662;</span></div>

            
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <ul className="list-unstyled">
                        {models.map((item) => <ModelItem key={item.id} model={item.name} />)}
                    </ul>
                </div>
            </div>
        </li>

    )

}