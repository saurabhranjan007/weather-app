const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "477992c9f64e17b15516436a0da3a61f";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {

        console.log(response.statusCode);

        // JSON.parse() -->> conversts data into simple readable text format
        response.on("data", function (data) {

            // Accessing the whole data as an obj.
            const weatherData = JSON.parse(data);

            // Accessing temperature data 
            const tempData = weatherData.main.temp;

            // Accessing weather description 
            const weatherDes = weatherData.weather[0].description;

            // Accessing icon.png image file
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // In a response you can only have one res.send()
            // So if you wish to display multiple response data, then use res.write()
            res.write("<h1>Temperature in " + query + ": " + tempData + "&#176C.</h1>");
            res.write("<h4>And, the weather is currently, " + weatherDes + "</h4>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    })
})





app.listen(3000, function () {
    console.log("The server is running port @3000");
});