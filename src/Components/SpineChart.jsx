import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function SpineChart({title, data}) {
    //const deviceNames = ["Average", ...data.map(item => item.device_name)];

    const rawTemperatureData   = data.filter((item) => item.type==="temperature")
    const rawHumidityData      = data.filter((item) => item.type==="humidity")
    const tempLocalDate     = [];
    const tempData          = [];
    const humidityLocalDate = [];
    const humidityData      = [];
    const tempDataSet       = [];

    for(var i=0;i<rawTemperatureData.length;i++) {
        for(var j=0;j<rawTemperatureData[i].values.length;j++) {
            tempLocalDate.push(new Date(rawTemperatureData[i].values[j].timestamp));
            tempData.push(rawTemperatureData[i].values[j].value);
        }
    }
    
    for(var i=0;i<rawHumidityData.length;i++) {
        for(var j=0;j<rawHumidityData[i].values.length;j++) {
            humidityLocalDate.push(new Date(rawHumidityData[i].values[j].timestamp));
            humidityData.push(rawHumidityData[i].values[j].value);
        }
    }

    for(var i=0;i<tempLocalDate.length;i++) {
        tempDataSet.push({
            x: tempLocalDate[i],
            y: tempData[i]
        })
    }
    
    for(var i=0;i<humidityLocalDate.length;i++) {
        tempDataSet.push({
            x: humidityLocalDate[i],
            y: rawHumidityData[i]
        })
    }

    console.log("rawTemperatureData = ", rawTemperatureData)
    console.log("rawHumidityData = ", rawHumidityData)
    console.log("tempLocalDate = ", tempLocalDate)
    console.log("humidityLocalDate = ", humidityLocalDate)
    
    const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: title
			},
            /*
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series"
			}],
            */
			axisX: {
				title: "Date & Time of Measurement"
			},
			axisY: {
				title: "Temperature",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				title: "Humidity",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
			},
			data: [{
				type: "spline",
				name: "Temperature",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Units",
				dataPoints: 
                    [
					{ x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
					{ x: new Date(2017, 7, 1), y: 156 },
					{ x: new Date(2017, 8, 1), y: 122 },
					{ x: new Date(2017, 9, 1), y: 106 },
					{ x: new Date(2017, 10, 1), y: 137 },
					{ x: new Date(2017, 11, 1), y: 142 }
				]
			},
			{
				type: "spline",
				name: "Humidity",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 19034.5 },
					{ x: new Date(2017, 1, 1), y: 20015 },
					{ x: new Date(2017, 2, 1), y: 27342 },
					{ x: new Date(2017, 3, 1), y: 20088 },
					{ x: new Date(2017, 4, 1), y: 20234 },
					{ x: new Date(2017, 5, 1), y: 29034 },
					{ x: new Date(2017, 6, 1), y: 30487 },
					{ x: new Date(2017, 7, 1), y: 32523 },
					{ x: new Date(2017, 8, 1), y: 20234 },
					{ x: new Date(2017, 9, 1), y: 27234 },
					{ x: new Date(2017, 10, 1), y: 33548 },
					{ x: new Date(2017, 11, 1), y: 32534 }
				]
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