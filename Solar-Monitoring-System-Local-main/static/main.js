// Function to update the battery capacity
function updateBatteryCapacity(capacity) {
    const batteryCapacityElement = document.getElementById('battery-capacity');

    capacity = Math.max(0, Math.min(100, capacity)); 
    batteryCapacityElement.style.width = `${capacity}%`; 

    // Update the background color based on charge
    if (capacity > 80) {
        batteryCapacityElement.style.backgroundColor = 'green';
    } else if (capacity > 60) {
        batteryCapacityElement.style.backgroundColor = 'yellowgreen';
    } else if (capacity > 50) {
        batteryCapacityElement.style.backgroundColor = 'yellow';
    } else if (capacity > 20) {
        batteryCapacityElement.style.backgroundColor = 'orange';
    } else {
        batteryCapacityElement.style.backgroundColor = 'red';
    }
    batteryCapacityElement.textContent = `${capacity}%`;
}
window.onload = function () {
// fetch request from the server for the json data
fetch('http://localhost:3000/data')
.then(response => response.json())
.then(data => {
    let maxSystemVoltage = data['Max System Voltage'];
    let maxSystemAmps = data['Max System Amps'];
    let maxDischarge = data['Max Discharge'];
    let systemType = data['System Type'];
    let batteryCapacity = data['Battery Capacity'];
    let batteryVoltage = data['Battery Voltage'];
    let chargingAmps = data['Charging Amps'];
    let controllerTemperature = data['Controller Temperature'];
    let loadVoltage = data['Load Voltage'];
    let loadCurrent = data['Load Current'];
    let loadPower = data['Load Power'];
    let pvVoltage = data['PV Voltage'];
    let pvCurrent = data['PV Current'];
    let pvPower = data['PV Power'];
    let batteryMaxVoltageToday = data['Battery Max Voltage Today'];
    let batteryMinVoltageToday = data['Battery Min Voltage Today'];
    let maxChargeCurrentToday = data['Max Charge Current Today'];
    let maxDischargeCurrentToday = data['Max Discharge Current Today'];
    let maxChargePowerToday = data['Max Charge Power Today'];
    let todaysMaxDischargePower = data['Todays Max Discharge Power'];
    let todaysMaxChargeAmpHours = data['Todays Max Charge Amp Hours'];
    let todaysMaxDischargeAmpHours = data['Todays Max Discharge Amp Hours'];
    let todaysPowerGenerated = data['Todays Power Generated'];
    let todaysPowerConsumed = data['Todays Power Consumed'];
    let uptime = data['Uptime'];
    let batteryOverCharges = data['Battery Over-Charges'];
    let batteryFullCharges = data['Battery Full Charges'];
    let chargeStateNum = data['Charge State Number'];
    let chargingState = data['Charging State'];
    let batteryType = data['Battery Type'];

    // system display
    document.getElementById('max-system-voltage-display').textContent = maxSystemVoltage;
    document.getElementById('max-system-amps-display').textContent = maxSystemAmps;
    document.getElementById('max-discharge-display').textContent = maxDischarge;

    // battery display
    updateBatteryCapacity(batteryCapacity);
    document.getElementById('battery-type-display').textContent = batteryType;
    document.getElementById('battery-voltage-display').textContent = batteryVoltage;
    document.getElementById('battery-charge-amps-display').textContent = chargingAmps;
    document.getElementById('battery-overcharge-display').textContent = batteryOverCharges;
    document.getElementById('battery-fullcharge-display').textContent = batteryFullCharges;
    document.getElementById('battery-charge-indicator-display').textContent = chargingState;

    // controller display
    document.getElementById('controller-temperature-display').textContent = controllerTemperature;
    document.getElementById('controller-uptime-display').textContent = uptime;

    // load display
    document.getElementById('load-voltage-display').textContent = loadVoltage;
    document.getElementById('load-current-display').textContent = loadCurrent;
    document.getElementById('load-power-display').textContent = loadPower;

    // pv display
    document.getElementById('pv-voltage-display').textContent = pvVoltage;
    document.getElementById('pv-current-display').textContent = pvCurrent;
    document.getElementById('pv-power-display').textContent = pvPower;

    // today display
    document.getElementById('today-power-generated-display').textContent = todaysPowerGenerated;
    document.getElementById('today-power-consumed-display').textContent = todaysPowerConsumed;
    document.getElementById('today-charge-power-display').textContent = maxChargePowerToday;
    document.getElementById('today-discharge-power-display').textContent = todaysMaxDischargePower;
    document.getElementById('today-maxcharge-current-display').textContent = maxChargeCurrentToday;
    document.getElementById('today-maxdischarge-current-display').textContent = maxDischargeCurrentToday;
    document.getElementById('today-maxcharge-amphours-display').textContent = todaysMaxChargeAmpHours;
    document.getElementById('today-maxdischarge-amphours-display').textContent = todaysMaxDischargeAmpHours;
    document.getElementById('battery-maxvoltage-today-display').textContent = batteryMaxVoltageToday;
    document.getElementById('battery-minvoltage-today-display').textContent = batteryMinVoltageToday;
})
    .catch(error => {
        console.error('Error fetching the data: ', error);
        const maxBatteryVoltageToday = weeklyData.map(item => item['Battery Max Voltage Today']);
        const minBatteryVoltageToday = weeklyData.map(item => item['Battery Min Voltage Today']);
        const maxChargeCurrentToday = weeklyData.map(item => item['Max Charge Current Todayy']);
        const maxDischargeCurrentToday = weeklyData.map(item => item['Max Discharge Current Today']);
        const maxChargePowerToday = weeklyData.map(item => item['Max Charge Power Today']);
        const maxDischargePowerToday = weeklyData.map(item => item['Todays Max Discharge Power']);
        const maxChargeAmpHoursToday = weeklyData.map(item => item['Todays Max Charge Amp Hours']);
        const maxDischargeAmpHoursToday = weeklyData.map(item => item['Todays Max Discharge Amp Hours']);
        const powerGeneratedToday = weeklyData.map(item => item['Todays Power Generated']);
        const powerConsumedToday = weeklyData.map(item => item['Todays Power Consumed']);
    });

// fetch weekly data and update graphs
fetch('http:localhost:3000/weeklydata')
.then(response => response.json())
.then(weeklyData => {
    const labels = weeklyData.map(item => new Date(item.date).toLocaleDateString('en-US', { weekday: 'long'}));

})

}

let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let testData = {
    "Battery Max Voltage Today": Math.random() * 20,  // Random voltage value
    "Battery Min Voltage Today": Math.random() * 20,  // Random voltage value
    "Max Charge Current Today": Math.random() * 100,  // Random current value
    "Max Discharge Current Today": Math.random() * 100,  // Random current value
    "Max Charge Power Today": Math.random() * 500,  // Random power value
    "Todays Max Discharge Power": Math.random() * 500,  // Random power value
    "Todays Max Charge Amp Hours": Math.random() * 200,  // Random amp-hours value
    "Todays Max Discharge Amp Hours": Math.random() * 200,  // Random amp-hours value
    "Todays Power Generated": Math.random() * 1000,  // Random power value
    "Todays Power Consumed": Math.random() * 1000  // Random power value
};

let chartColors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'yellow', 'grey', 'brown', 'black'];

function generateWeeklyData(dataPoint) {
    return daysOfWeek.map(() => Math.random() * dataPoint);
}

let batteryMaxVoltageData = generateWeeklyData(testData["Battery Max Voltage Today"]);

Object.keys(testData).forEach((key, index) => {
    let data = generateWeeklyData(testData[key]);
    new Chart(document.getElementById(`chart${index + 1}`), {
        type: 'line',
        data: {
            labels: daysOfWeek,
            datasets: [{
                label: key,
                data: data.map((value, idx) => ({ x: daysOfWeek[idx], y: value })),
                backgroundColor: chartColors[index]
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    labels: daysOfWeek
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});


