//required declarations
var express = require("express");
var app = express();

//root default
app.get('/', function(req, res){
    res.status(200).send("root");
});

// Write a server called zillow.js that serves JSON data when it receives a GET request to the path ’/v1/zillow/zestimate’. 
app.get('/v1/zillow/zestimate', (req, res) => {
    if(req.query != null){
        // Expect the request to contain a query string with a keys ’sqft’, ’bed’, and ’bath’ all of which will be required integers.
        var {sqft, bed, bath} = req.query;

        //Zestimate == sqft * bed * bath * 10 and you should return to the use JSON in the following format: {zestimate: Number }
        var zestimate = sqft * bed * bath * 10;

        // The JSON response should contain only the ‘zestimate’ property:
        res.status(200).json({zestimate});
    }else{
        res.status(404).send("Invalid argument");
    }
});
// For example: /v1/zillow/zestimate?sqft=2000&bed=3&bath=4
// For example: {“zestimate”: 240000}

// Add a second endpoint at the path ‘/v1/zillow/houses’ that accepts an optional parameter ‘city‘.
app.get('/v1/zillow/houses', (req, res) => {
    // If city is provided as a parameter, the return all houses that match the given city.
    const city = req.query.city;

    if(!city){
        // If no city parameter is provided, then return an empty array [].
        res.status(404).send("No city entered").json([]);
    }else{
        const resultsArr = sampleDB.filter(sampleDB => sampleDB.city === city);

        if(resultsArr != null){
            res.status(200).json(resultsArr);
        }else{
            // If a city is provided and the city is not found, return an empty array [].
            // this actual code just doesn't do anything, but the code itself functions as asked technically
            res.status(200).json([]);
        }
    }});
// For example: /v1/zillow/houses?city=baltimore
// The JSON response should contain only the the list of houses in baltimore.
// For example: [{ price: 240000, city: ”baltimore” }, { price: 325000, city: ”baltimore” }]

// For example: /v1/zillow/houses?city=raleigh
// The JSON response should contain: []

// For example: /v1/zillow/houses
// The JSON response should contain: []

// Add a third endpoint at the path ‘/v1/zillow/prices’ that accepts a requiredparameter ‘usd‘.
// This will return all houses equal to or under a given price. 
app.get('/v1/zillow/prices', (req, res) => {
    if(req.query.usd ){
        const usd = req.query.usd;
        const resultsArr = sampleDB.filter(sampleDB => sampleDB.price <= usd);

        if(resultsArr != null){
            res.status(200).json(resultsArr);
        }else{
            // If no houses are under the given price, return an empty array: []
            res.status(200).send("No houses under given price").json([]);
        }
    }else{
        res.status(404).send("Invalid argument for price point");
    }
});

// For example: /v1/zillow/prices?usd=300000
// The JSON response should contain: [{ price: 240000, city: ”baltimore” }, {
// price: 300000, city: “austin” }, { price: 250000, city: ”boston” }]
// For example: /v1/zillow/prices?usd=10000
// The JSON response should contain: []

// Please return a 200 status code if the request is correct and a 404 if the request is not correct (invalid endpoint, arguments, etc.)

//sample data since we're not pulling from a real db
var sampleDB = [
    {
        "price": 240000, 
        "city": "baltimore"
    },{
        "price": 300000,
        "city": "austin"
    },{
        "price": 400000,
        "city": "austin"
    },{
        "price": 1000000,
        "city": "seattle"
    },{
        "price": 325000,
        "city": "baltimore"
    },{
        "price": 550000,
        "city": "seattle"
    },{
        "price": 250000,
        "city": "boston"
    }
];

//taken from practice vid to launch local port
app.listen(3000);
console.log("Navigate to http://localhost:3000/");

//Please submit the following on Blackboard: zillow.js