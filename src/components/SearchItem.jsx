import { Link } from 'react-router-dom';

export default function SearchItem({ item }) {
    return (
        <div className="relative flex items-center gap-3 p-2 hover:bg-gray-100 transition-colors rounded-md">
            
            <img 
                src={item.img} 
                className="w-12.5 h-12.5 object-contain" 
                alt={item.title} 
            />
            
            <div className="flex flex-col">
                <p className="m-0 text-sm font-semibold text-gray-800">
                    {item.title}
                </p>
                <p className="m-0 text-sm text-gray-500">
                    {item.price}
                </p>
            </div>

            <Link 
                to={`/product/${item.id}`} 
                className="absolute inset-0 z-10"
            />
            
        </div>
    );
}