import { Link } from "react-router-dom"


export default function ModelItem({ model, id, closeList }) {
    // console.log(id)
    return (
        <li onClick={(e) => {
            e.stopPropagation();
            closeList(false)
            }} className="relative pl-2 z-10 m-1">{model}
            <Link className="absolute inset-0" to={`/product/${id}`} />
        </li>
    )

}