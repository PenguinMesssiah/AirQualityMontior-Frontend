import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motivation, motivationSource } from '@/text/textFile'
import 'leaflet/dist/leaflet.css'

function HomePage() {
    return (
    <>
        <main className="flex-1 min-w-full max-w-screen font-mono text-indigo-900 bg-inherit">
          <p className="flex pt-4 pb-2 font-semibold text-4xl">Greater Hazelwood: Air Quality Monitoring</p>
          {/*Leaflet Map*/}
          <MapContainer
            center={[40.40666, -79.94271]}
            zoom={13}
            className="max-w-full rounded-md"
            style={{ height: '400px'}}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.40666, -79.94271]}>
              <Popup>
                Arts Excusion Unlimited <br/>Base Station!
              </Popup>
            </Marker>
          </MapContainer>
          <p className="flex pt-6 font-medium text-2xl">Community Air Quality Tracking Using EPA AQI Standards</p>
          <p className="flex font-normal text-lg">Empowering everyone to gain control and understanding of their built environment.</p>
          <p className="flex text-justify">{motivation}</p>
          <p className="pt-2 italic">{motivationSource}</p>
        </main>
    </>
  )
};

export default HomePage;