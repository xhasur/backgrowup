var router = require('express').Router(),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    cors = require('cors');


var collection;

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/growup'
    , function(err, db){
        if(!err){
            console.log("MONGODB connect");
            residentialCollection = db.collection('residential');
        }
        else{
            console.log(err);
        }
});

router.get('/getResidential', cors(), function(req, res){
    console.log("getResidential")
    "use strict";
    residentialCollection.find().toArray(function (err, items){
        var resultado;
        if (!err){
            resultado = {
                status: 200,
                result : items
            }
        }
        else{
            resultado = {
                status:500,
                result : err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));
    })
});

module.exports = router;