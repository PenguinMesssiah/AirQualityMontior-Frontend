import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motivation, motivationSource } from '@/text/textFile'
import OverviewCard from '@/Components/OverviewCard'
import MapDataCard from '@/Components/MapDataCard';
import { fetchJsonWithRetry } from '@/utils/fetchWithRetry'
import 'leaflet/dist/leaflet.css'

const baseURL = "https://artsexcursionairquality.org"

function HomePage() {
    const [deviceCount, setDeviceCount] = useState(null);
    const [lastReading, setLastReading] = useState(null);
    const [markerList, setMarkerList] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [serverStatus, setServerStatus] = useState('unknown');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                setLoading(true);

                // Fetch sensor data to get device count and last reading
                const json = await fetchJsonWithRetry(`${baseURL}/api/sensor_data`);
                console.log("received data = ", json)
                // Set device count
                setDeviceCount(json.length);

                // Find the most recent reading across all devices
                if (json.length > 0) {
                    const allTimestamps = json.flatMap(device =>
                        device.timestamp || []
                    );

                    if (allTimestamps.length > 0) {
                        const mostRecent = allTimestamps.reduce((latest, current) => {
                            return new Date(current) > new Date(latest) ? current : latest;
                        });
                        setLastReading(mostRecent);
                    }
                }
                
                //Set Marker List
                var markerList = json.map((item, index) => {
                  const displayName = item.device_name === "Edith" ? "Arts Excursion Unlimited" : `Device #${index}`;
                  const enrichedItem = { ...item, displayName };
                  return (
                    <Marker
                      position={[item.lat, item.lon]}
                      key={index}
                      eventHandlers={{click: () => setSelectedDevice(enrichedItem)}}>
                      <Popup>{displayName}</Popup>
                    </Marker>
                  );
                })
                setMarkerList(markerList);
                const edithIndex = json.findIndex((item) => item.device_name === "Edith");
                if (edithIndex !== -1) setSelectedDevice({ ...json[edithIndex], displayName: "Arts Excursion Unlimited" });

                // Server is online if we successfully fetched data
                setServerStatus('online');
            } catch (err) {
                console.error("Error fetching overview data:", err);
                setServerStatus('offline');
                // Set device count to 0 on error, or keep null to show "—"
                setDeviceCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    useEffect(() => {
        if(lastReading != null) {
            console.log("lastReading = ", lastReading)
        }
    },[lastReading])

    useEffect(() => {
      if(selectedDevice != null) {
        console.log("selectedDevice = ", selectedDevice)
      }
    }, [selectedDevice])

    useEffect(() => {
      if(markerList != null) {
        console.log("markerList = ", markerList)
      }
    },[markerList])
    
    return (
    <>
        <main className="flex-1 min-w-full max-w-screen font-sans text-indigo-900 bg-inherit">
          <p className="flex pt-4 pb-2 font-semibold text-4xl">Hazelwood | Air Quality Monitoring</p>

          {/* Map Container Wrapper - Required for absolute positioning of overlay card */}
          <div style={{ position: 'relative' }}>
            <MapDataCard
              locationName={selectedDevice?.displayName ?? "Select a Location"}
              aqi={selectedDevice?.device_quality ?? null}
              temperature={Math.round((selectedDevice?.temperature * 9/5) + 32) ?? null}
              humidity={Math.round(selectedDevice?.humidity) ?? null}
              isVisible={selectedDevice !== null}
              onClose={() => setSelectedDevice(null)}
            />

            {/*Leaflet Map*/}
            <MapContainer
              center={[40.40666, -79.94271]}
              zoom={13}
              className="max-w-full rounded-md pb-6"
              style={{ height: '500px'}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markerList}
            </MapContainer>
          </div>
          
          <hr></hr>
          <p className="flex  font-medium text-2xl">Community Air Quality Tracking Using EPA AQI Standards</p>
          <div className="flex text-justify">{motivation}</div>
          <div className="italic mb-6">{motivationSource}</div>

          {/* Overview Card */}
          {!loading && (
            <OverviewCard
              deviceCount={deviceCount}
              lastReading={lastReading}
              serverStatus={serverStatus}
            />
          )}
        </main>
    </>
  )
};

export default HomePage;