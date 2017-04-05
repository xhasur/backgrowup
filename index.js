var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

var app = express();

//connect database
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/growup", function(err, db) {
  if(!err) {
    console.log("MongoDb Connect");}
});

//var endpoints = require('./routes/index');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.options("*", cors());

//api users route
app.use("/api/users", require('./routes/user'));

//api residential
app.use("/api/residential", require('./routes/residential'));

var routes = express.Router();

app.use(routes);

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Escuchando el puerto " + port);
})