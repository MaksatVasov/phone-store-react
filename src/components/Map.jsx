import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

export default function Map() {
    return (
        <MapContainer 
            center={[37.95, 58.38]} 
            zoom={13} 
            scrollWheelZoom={false}
            // Карта займет ровно 100% от того блока, в который ты её положишь
            style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={[37.94, 58.39]}>
                <Popup>
                    <div className="font-sans leading-snug">
                        <h5 className="m-0 mb-1 text-[#1c1c27] font-semibold text-base">
                            Магазин Qpick
                        </h5>
                        <p className="m-0 text-[13px] text-[#838383]">
                            Пункт самовывоза товаров
                        </p>
                        <p className="m-0 mt-1 text-[12px] text-[#1c1c27]">
                            Режим работы: 09:00 — 22:00
                        </p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}