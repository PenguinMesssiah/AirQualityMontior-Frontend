import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, TileLayer } from 'react-leaflet'
import MapDataCard from '@/Components/MapDataCard'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function MapSection({ markerList, selectedDevice, onClose }) {
    const temperature = selectedDevice
        ? Math.round((selectedDevice.temperature * 9 / 5) + 32)
        : null;

    return (
        <div style={{ position: 'relative' }}>
            <MapDataCard
                locationName={selectedDevice?.displayName ?? "Select a Location"}
                aqi={selectedDevice?.device_quality ?? null}
                temperature={temperature}
                humidity={selectedDevice ? Math.round(selectedDevice.humidity) : null}
                isVisible={selectedDevice !== null}
                onClose={onClose}
            />

            <MapContainer
                center={[40.40666, -79.94271]}
                zoom={13}
                className="max-w-full rounded-md pb-6"
                style={{ height: '500px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerList}
            </MapContainer>
        </div>
    );
}

export default MapSection;
