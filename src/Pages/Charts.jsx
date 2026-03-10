import { useState, useEffect } from 'react'

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
        <main className="flex-1 min-w-full max-w-screen">
            {loading && <p>Loading Charts</p>}
            {!loading && <p>Charts Ready to Load</p>}
        </main>
        </>
    )
};

export default ChartsPage;