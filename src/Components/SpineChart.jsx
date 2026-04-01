import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function SpineChart({title, data, timeRangeDays = 30}) {
    /**
     * Filter data points to only include recent readings within the specified time range
     * This prevents misleading visualizations when there are large gaps in the data
     */
    const filterRecentData = (values, days) => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return values.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= cutoffDate;
        });
    };

    // Filter data by type
    const rawTemperatureData = data.filter((item) => item.type === "temperature");
    const rawHumidityData = data.filter((item) => item.type === "humidity");
    const rawAQIData = data.filter((item) => item.type === "aqi_pm25");

    // Process Temperature data (convert Celsius to Fahrenheit)
    const temperatureDataPoints = [];
    for (let i = 0; i < rawTemperatureData.length; i++) {
        const recentValues = filterRecentData(rawTemperatureData[i].values, timeRangeDays);
        for (let j = 0; j < recentValues.length; j++) {
            const celsiusValue = recentValues[j].value;
            temperatureDataPoints.push({
                x: new Date(recentValues[j].timestamp),
                y: celsiusToFahrenheit(celsiusValue)
            });
        }
    }

    // Process Humidity data
    const humidityDataPoints = [];
    for (let i = 0; i < rawHumidityData.length; i++) {
        const recentValues = filterRecentData(rawHumidityData[i].values, timeRangeDays);
        for (let j = 0; j < recentValues.length; j++) {
            humidityDataPoints.push({
                x: new Date(recentValues[j].timestamp),
                y: recentValues[j].value
            });
        }
    }

    // Process AQI data
    const aqiDataPoints = [];
    for (let i = 0; i < rawAQIData.length; i++) {
        const recentValues = filterRecentData(rawAQIData[i].values, timeRangeDays);
        for (let j = 0; j < recentValues.length; j++) {
            aqiDataPoints.push({
                x: new Date(recentValues[j].timestamp),
                y: recentValues[j].value
            });
        }
    }

    // Sort data points by timestamp to ensure proper line connections
    temperatureDataPoints.sort((a, b) => a.x - b.x);
    humidityDataPoints.sort((a, b) => a.x - b.x);
    aqiDataPoints.sort((a, b) => a.x - b.x);

    console.log("Temperature data points:", temperatureDataPoints);
    console.log("Humidity data points:", humidityDataPoints);
    console.log("AQI data points:", aqiDataPoints)

    // Format time range display
    const getTimeRangeText = () => {
        if (timeRangeDays >= 365) {
            return `Showing data from the last ${Math.floor(timeRangeDays / 365)} year(s)`;
        } else if (timeRangeDays >= 30) {
            return `Showing data from the last ${Math.floor(timeRangeDays / 30)} month(s)`;
        } else {
            return `Showing data from the last ${timeRangeDays} days`;
        }
    };

    const options = {
			theme: "light2",
			backgroundColor: "#fdfaf6",
			animationEnabled: true,
			title: {
				text: title
			},
			subtitles: [{
				text: `${getTimeRangeText()} • Click Legend to Hide or Unhide Data Series`,
				fontSize: 12
			}],
			axisX: {
				title: "Date & Time",
				valueFormatString: "MMM DD HH:mm",
				labelAngle: -45
			},
			axisY: {
				title: "Temperature (°F)",
				titleFontColor: "#C24642",
				lineColor: "#C24642",
				labelFontColor: "#C24642",
				tickColor: "#C24642",
				suffix: "°F"
			},
			axisY2: [{
				title: "Humidity (%)",
				titleFontColor: "#036843ff",
				lineColor: "#036843ff",
				labelFontColor: "#036843ff",
				tickColor: "#036843ff",
				suffix: "%"
			},
			{
				title: "AQI",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			}],
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: function(e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
			},
			data: [{
				type: "spline",
				name: "Temperature",
				color: "#C24642",
				showInLegend: true,
				xValueFormatString: "MMM DD, YYYY HH:mm",
				yValueFormatString: "#,##0.##°F",
				dataPoints: temperatureDataPoints
			},
			{
				type: "spline",
				name: "Humidity",
				color: "#036843ff",
				axisYType: "secondary",
				axisYIndex: 0,
				showInLegend: true,
				xValueFormatString: "MMM DD, YYYY HH:mm",
				yValueFormatString: "#,##0.##%",
				dataPoints: humidityDataPoints
			},
			{
				type: "spline",
				name: "AQI",
				color: "#6D78AD",
				axisYType: "secondary",
				axisYIndex: 1,
				showInLegend: true,
				xValueFormatString: "MMM DD, YYYY HH:mm",
				yValueFormatString: "#,##0.##",
				dataPoints: aqiDataPoints
			}]
        }
            
    return (
        <>
            <div style={{ display:'flex', justifyContent: 'center', margin: '0 auto' }}>
                <CanvasJSChart options={options}/>
            </div>
        </>
    )
}

export default SpineChart;