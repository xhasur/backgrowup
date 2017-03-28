var express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors");

var app = express();

//connect database
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/growup", function(err, db) {
  if(!err) {
    console.log("MongoDb Connect");
    
        var ticketCollection = db.collection('users');
        var user1 = {
                'id': 1, 
                'nombre': 'andres',
                'apellido': 'lopez'
            };
        
                var user2 = {
                'id': 1, 
                'nombre': 'andres2',
                'apellido': 'lopez2'
            };

        var users = [
                {'id': 3, 'nombre': 'wewer', 'apellido': 'in wewewe'},
                {'id': 4, 'nombre': 'nwewea', 'apellido': 'wewewe'}  
            ];
        ticketCollection.insert(user1);
        ticketCollection.insert(user2, {w:1}, function(err, result) {});
        ticketCollection.insert(users, {w:1}, function(err, result) {});
    
  }
});

var endpoints = require('./routes/index');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.options("*", cors());

app.use("/", endpoints);


var routes = express.Router();

app.use(routes);

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Escuchando el puerto " + port);
})