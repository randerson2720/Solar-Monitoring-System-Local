const express = require('express');
const http = require('http');
const app = express();
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

//store the json data from the python script
let solarData = {};
let weeklyData = {};


// Parse JSON data
app.use(express.json());

// Server static files
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.post('/data', (req, res) => {
    console.log("Data received from python code.");
    console.log(req.body);
    solarData = req.body;
    res.status(200).send('Data received and stored on the server.');
});

// store the today data
app.post('/store', (req, res) => {
    const dataToStore = {
        date: new Date().toISOString().split('T')[0], //stores the date
        "Battery Max Voltage Today": json_data["Battery Max Voltage Today"],
        "Battery Min Voltage Today": json_data["Battery Min Voltage Today"],
        "Max Charge Current Today": json_data["Max Charge Current Today"],
        "Max Discharge Current Today": json_data["Max Discharge Current Today"],
        "Max Charge Power Today": json_data["Max Charge Power Today"],
        "Todays Max Discharge Power": json_data["Todays Max Discharge Power"],
        "Todays Max Charge Amp Hours": json_data["Todays Max Charge Amp Hours"],
        "Todays Max Discharge Amp Hours": json_data["Todays Max Discharge Amp Hours"],
        "Todays Power Generated": json_data["Todays Power Generated"],
        "Todays Power Consumed": json_data["Todays Power Consumed"],
    };
    weeklyData.push(dataToStore);
    if(weeklyData.length > 7) {
        weeklyData.shift(); // removes the oldest entry
    }
    console.log("Stored 7-day data:", weeklyData);
    res.status(200).send('7-day data stored successfully.');
})
// route to get the current solar data
app.get('/data', (req, res) =>  {
    res.json(solarData);
});

// route to get the 7-day data
app.get('/weeklydata', (req, res) => {
    res.json(weeklyData);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});