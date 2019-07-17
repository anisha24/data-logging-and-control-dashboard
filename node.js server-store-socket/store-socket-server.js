var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');

var app = express();

var redisClient = redis.createClient();
redisClient.on('connect', function() {
    console.log("Connected to redis server...")
})

