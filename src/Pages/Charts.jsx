import { useState, useEffect, use } from 'react'
import BarChart from '@/Components/BarChart';
import { EPA } from '@/text/textFile';
import { EPA_Citations } from '@/text/textFile';
import DeviceDropdown from '@/Components/Dropdown';

const baseURL = "https://artsexcursionairquality.org"

function ChartsPage() {
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await fetch(`${baseURL}/sensor_data`);
                if(!response.ok) throw Error("Failed to Fetch Sensor Data, Check Server Status");
                const json = await response.json();
                console.log("received data = ", json)
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown Error Fetching Average Data")
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [])

    useEffect(() => {
        //Null Check
        if (!selectedDevice || selectedDevice === "Average") {
            return;
        }

        const fetchDeviceData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseURL}/sensor_data/${selectedDevice}`); //sensor_data/<device_name>
                if(!response.ok) throw Error(`Failed to Fetch Device Data for ${selectedDevice}`);
                const json = await response.json();
                setDeviceData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown Error Retrieving Device Data");
            } finally {
                setLoading(false);
            }
        };
        fetchDeviceData();
    }, [selectedDevice])
    
    useEffect(() => {
        if(deviceData != null) {
            console.log("deviceData = ", deviceData)
        }
    },[deviceData])

    function handleSelect(device) {
        setSelectedDevice(device)
    }

    const deviceNames = ["Average", ...data.map(item => item.device_name)];

    if (error) return <p>{error}</p>;
    
    return (
        <>
            <main className="flex-1 w-full justify-center mt-2">
                <DeviceDropdown deviceNames={deviceNames} onDeviceSelect={handleSelect}></DeviceDropdown>                    
                {loading && <p>Loading Charts</p>}
                {!loading && (selectedDevice===null || selectedDevice==="Average") && (
                    <BarChart title="Average AQI Values" data={data}></BarChart>
                )}
                {!loading && selectedDevice!==null && selectedDevice!=="Average" &&
                    <p>Show Line Chart</p>
                }
                <hr className='mt-6'></hr>
                <p className="flex pt-6 font-medium text-2xl">Real-Time AQI Data Measured Against EPA Standards</p>
                <p className="flex mt-3 text-justify">{EPA}</p>
                <p className="pt-2 italic">{EPA_Citations}</p>
            </main>
        </>
    )
};

export default ChartsPage;