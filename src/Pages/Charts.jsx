import { useState, useEffect } from 'react'
import BarChart from '@/Components/BarChart';
import { EPA } from '@/text/textFile';
import { EPA_Citations } from '@/text/textFile';
import DeviceDropdown from '@/Components/Dropdown';
import SpineChart from '@/Components/SpineChart';
import Alert from '@/Components/Alert';
import { fetchJsonWithRetry } from '@/utils/fetchWithRetry';

const baseURL = "https://artsexcursionairquality.org"

function ChartsPage() {
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceData, setDeviceData] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setAlertMessage(null);

                const json = await fetchJsonWithRetry(`${baseURL}/sensor_data`);
                console.log("received data = ", json)
                setData(json);
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : "Unknown Error Fetching Average Data";
                setAlertMessage(errorMsg);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [])

    useEffect(() => {
        //Null Check
        if (!selectedDevice || selectedDevice === "Average") {
            setDeviceData([]);
            return;
        }

        setDeviceData([]); //Clean Up

        const fetchDeviceData = async () => {
            try {
                setLoading(true);
                setAlertMessage(null);

                const json = await fetchJsonWithRetry(`${baseURL}/sensor_data/${selectedDevice}`);
                setDeviceData(json);
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : "Unknown Error Retrieving Device Data";
                setAlertMessage(errorMsg);
            } finally {
                setLoading(false);
            }
        };
        fetchDeviceData();
    }, [selectedDevice])
    
    useEffect(() => {
        if(deviceData.length > 0) {
            console.log("deviceData = ", deviceData)
        }
    },[deviceData])

    function handleSelect(device) {
        setSelectedDevice(device)
    }

    const deviceNames = ["Average", ...data.map(item => item.device_name)];

    return (
        <>
            <main className="flex-1 w-full justify-center mt-2 font-mono text-indigo-900">
                {alertMessage && (
                    <Alert
                        message={alertMessage}
                        variant="danger"
                        onClose={() => setAlertMessage(null)}
                    />
                )}
                <DeviceDropdown deviceNames={deviceNames} onDeviceSelect={handleSelect}></DeviceDropdown>
                {loading && <p>Loading Charts</p>}
                {!loading && (selectedDevice===null || selectedDevice==="Average") && (
                    <BarChart title="Average AQI (PM2.5) Values" data={data}></BarChart>
                )}
                {!loading && selectedDevice!==null && selectedDevice!=="Average" && deviceData.length > 0 &&
                    //<p>Load Spine Chart</p>
                    <SpineChart title={`${selectedDevice}'s Data`} data={deviceData}></SpineChart>
                }
                <hr className=''></hr>
                <p className="flex font-medium text-2xl">Real-Time AQI Data Measured Against EPA Standards</p>
                <div className="flex mt-3 text-justify">{EPA}</div>
                <div className=" italic">{EPA_Citations}</div>
            </main>
        </>
    )
};

export default ChartsPage;