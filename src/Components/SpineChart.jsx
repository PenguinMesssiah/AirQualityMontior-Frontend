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

function SpineChart({title, data}) {
    // Filter data by type
    const rawTemperatureData = data.filter((item) => item.type === "temperature");
    const rawHumidityData = data.filter((item) => item.type === "humidity");
    const rawAQIData = data.filter((item) => item.type === "aqi_pm25");

    // Process Temperature data (convert Celsius to Fahrenheit)
    const temperatureDataPoints = [];
    for (let i = 0; i < rawTemperatureData.length; i++) {
        for (let j = 0; j < rawTemperatureData[i].values.length; j++) {
            const celsiusValue = rawTemperatureData[i].values[j].value;
            temperatureDataPoints.push({
                x: new Date(rawTemperatureData[i].values[j].timestamp),
                y: celsiusToFahrenheit(celsiusValue)
            });
        }
    }

    // Process Humidity data
    const humidityDataPoints = [];
    for (let i = 0; i < rawHumidityData.length; i++) {
        for (let j = 0; j < rawHumidityData[i].values.length; j++) {
            humidityDataPoints.push({
                x: new Date(rawHumidityData[i].values[j].timestamp),
                y: rawHumidityData[i].values[j].value
            });
        }
    }

    // Process AQI data
    const aqiDataPoints = [];
    for (let i = 0; i < rawAQIData.length; i++) {
        for (let j = 0; j < rawAQIData[i].values.length; j++) {
            aqiDataPoints.push({
                x: new Date(rawAQIData[i].values[j].timestamp),
                y: rawAQIData[i].values[j].value
            });
        }
    }

    console.log("Temperature data points:", temperatureDataPoints);
    console.log("Humidity data points:", humidityDataPoints);
    console.log("AQI data points:", aqiDataPoints)
    
    const options = {
			theme: "light2",
			backgroundColor: "#fdfaf6",
			animationEnabled: true,
			title: {
				text: title
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series",
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