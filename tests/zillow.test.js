import {describe, test, it, expect} from "vitest";

const zillow = require('../zillow.js');

var express = require("express");
var app = express();

describe('GET /v1/zillow/prices', () =>{
    test('responds with empty array, res status 200', async () =>{
        const response = await request(zillow).get('/v1/zillow/prices').query({usd: 10000});
        expect(response.status).toBe(200);
        expect(response.text).toBe([]);
    })
})