import { useState, useEffect } from 'react'
import BarChart from '@/Components/BarChart';
import { EPA } from '@/text/textFile';
import { EPA_Citations } from '@/text/textFile';

const baseURL = "https://artsexcursionairquality.org"


function ChartsPage() {
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/sensor_data`);
                if(!response.ok) throw Error("Failed to Fetch Sensor Data, Check Server Status");
                const json = await response.json();
                console.log("received data = ", json)
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown Error Detected")
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    if (error) return <p>{error}</p>;
    
    return (
        <>
            <main className="flex-1 w-full justify-center">
                {loading && <p>Loading Charts</p>}
                {!loading && (
                    <BarChart title="Average AQI Values" data={data}></BarChart>
                )}
                <hr className='mt-6'></hr>
                <p className="flex pt-6 font-medium text-2xl">Real-Time AQI Data Measured Against EPA Standards</p>
                <p className="flex mt-3 text-justify">{EPA}</p>
                <p className="pt-2 italic">{EPA_Citations}</p>
            </main>
        </>
    )
};

export default ChartsPage;