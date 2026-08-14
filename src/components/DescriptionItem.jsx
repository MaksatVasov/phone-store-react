

export default function DescriptionItem({ arr }) {
  
    return (
        <li className="flex gap-1.5"><span className="inline-block font-bold">{arr[0]}</span> <span>{arr[1]}</span></li>
    )

}