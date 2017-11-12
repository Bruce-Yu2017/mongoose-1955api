var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
var path = require('path');
app.set('views', path.join(__dirname, './views'));
// mongoose.Promise = global.Promise;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api');

app.use(bodyParser.json());

var ApiSchema = new mongoose.Schema({
    name: String
})
mongoose.model("Api", ApiSchema);
var Api = mongoose.model("Api");

app.get("/", function(req, res) {
    Api.find({}, function(req, api) {
        res.json(api);
    })
})

app.get("/new/:name", function(req, res) {
    var api = new Api({name: req.params.name});
    api.save({name: req.body.name}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/")
        }
    })
})

app.get("/remove/:name", function(req, res) {
    Api.remove({name: req.params.name}, function(req, data) {
        res.json(data);
    })
})

app.get("/:name", function(req, res) {
    Api.find({name: req.params.name}, function(req, data) {
        res.json(data);
    })
})

app.listen(8000, function() {
    console.log("server connecting!")
})