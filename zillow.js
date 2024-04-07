//required declarations
const express = require("express");
const app = express();

//root default
app.get('/', function(req, res){
    res.status(200).send("root");
});

//cheeky flavor text
app.get('/v1/zillow', function(req, res){
    res.status(200).send("Welcome to Zillow");
});

// Write a server called zillow.js that serves JSON data when it receives a GET request to the path ’/v1/zillow/zestimate’. 
app.get('/v1/zillow/zestimate', (req, res) => {
    // Expect the request to contain a query string with a keys ’sqft’, ’bed’, and ’bath’ all of which will be required integers.
    var {sqft, bed, bath} = req.query;

    //Zestimate == sqft * bed * bath * 10 and you should return to the use JSON in the following format: {zestimate: Number }
    var zestimate = sqft * bed * bath * 10;

    // all of which will be required integers.
    if(isNaN(sqft) || !sqft || isNaN(bed) || !bed || isNaN(bath) || !bath){
        res.status(404).send("Invalid argument").json([]);
    }else{
        // The JSON response should contain only the ‘zestimate’ property:
        res.status(200).json({zestimate});
    }});
// For example: /v1/zillow/zestimate?sqft=2000&bed=3&bath=4
// For example: {“zestimate”: 240000}

// Add a second endpoint at the path ‘/v1/zillow/houses’ that accepts an optional parameter ‘city‘.
app.get('/v1/zillow/houses', (req, res) => {
    // If city is provided as a parameter, the return all houses that match the given city.
    var city = req.query.city;

    if(!city){
        // If no city parameter is provided, then return an empty array [].
        res.status(200).json([]);
    }else{
        var resultsArr = sampleDB.filter(sampleDB => sampleDB.city === city);

        if(resultsArr.length === 0){
            res.status(200).json([]);
        }else{
            res.status(200).json(resultsArr);
        }}});
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
    var usd = req.query.usd;

    if(isNaN(usd) || !usd){
        res.status(404).send("Invalid argument for price point");
    }else{
        var resultsArr = sampleDB.filter(sampleDB => sampleDB.price <= usd);

        if(resultsArr.length === 0){
            // If no houses are under the given price, return an empty array: []
            res.status(200).json([]);
        }else{
            res.status(200).json(resultsArr);
        }}});

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