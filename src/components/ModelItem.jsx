

export default function ModelItem({ model }) {

    return (
        <li onClick={(e) => e.stopPropagation()} className="pl-2 z-10 m-1">{model}</li>
    )

}