import { useRef } from 'react';
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';

import { LatLng } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export const MapComponent = ({ geolocation }) => {
    const { lat, lng } = geolocation;
    const mapRef = useRef();
    const position = new LatLng(lat, lng);

    return (
        <MapContainer
            zoom={12}
            ref={mapRef}
            center={position}
            style={{ width: '100%', height: '40vh' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};
