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
            userCollection = db.collection('users');
              
              /*
              userCollection=   db.createCollection( "users",
                { validator: { $or:
                    [
                        { phone: { $type: "string" } },
                        { email: { $regex: /@mongodb\.com$/ } },
                        { status: { $in: [ "Unknown", "Incomplete" ] } }
                    ]
                }
                } 
                ) 
                 */

        }
        else{
            console.log(err);
        }
});

router.post("/getUser", cors(), function(req, res){
    "use strict";
    console.log(req.body.id);
    userCollection.findOne(
        { 
          'username': req.body.username,
          'password': req.body.password,   
    }, function(err, item){
        console.log(item);
        var resultado;
        if(!err){
            resultado = {
                status : 200,
                result: item
            }
        }
        else{
            resultado = {
                status : 500,
                result : err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));
    })
});


router.get('/getUsers', cors(), function(req, res){
    console.log("getUsers")
    "use strict";
    userCollection.find().toArray(function (err, items){
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

router.post('/saveUsers', cors(), function(req, res){
"use strict";
    console.log(req.body.id);
    var user = {
                'name': req.body.name,
                'lastname': req.body.lastname,
                'age': req.body.age,
                'username': req.body.username,
                'password': req.body.password,
                };
    userCollection.insert(user, {w:1}, function(err, result) {
        var resultado;
        if(!err){
            resultado = {
                status : 200,
                result: user
            }
        }
        else{
            resultado = {
                status : 500,
                result : err
            }
        }
        res.set('Content-Type', 'application/json').send(JSON.stringify(resultado));
    });
});

/*
    module.exports = function (express, entityModel) {
        var router = express.Router();
        router.post("/insertar", function (req, res) {createPersonas(req, res, entityModel);});
        router.get("/listar", function (req, res) {getPersonas2(req, res, entityModel);});
        router.delete("/eliminar/:id", function (req, res) {borrarPersona(req, res,entityModel);});
        return router;
    };
*/

module.exports = router;