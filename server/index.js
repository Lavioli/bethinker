import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/stickies'); // connect to our database
import User from './models/user';
import Sticky from './models/sticky';
import bodyParser from 'body-parser';
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
//Basic strategy
var stategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            callback(err);
            return;
        }
        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(stategy);

//app.use(passport.initialize());
const jsonParser = bodyParser.json();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}



//Allows authorizied users to see their sticky notes
app.get('/stickies', function(req,res){
    Sticky.find(function(err, sticky){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(sticky);
    });
});
//Allows users to create the title for their sticky notes
app.post('/stickies', jsonParser, passport.authenticate('basic', {
        session: false
    }),function(req, res) {
            if(!req.body.username) {
                 return res.status(422).json({
                "message": "Missing field: text"
            });
        }
        else if (typeof(req.body.username) !== "string") {
            return res.status(422).json ({
                "message": "Incorrect field type: text"
            });
        }
        if ((req.User._id.toString()) !== req.body.from){
            return res.status(422).json({
                "message": "you can't steal another person's identication"
            });
        }
            
    
    Sticky.create({
        name: req.body.name,
        date: req.body.date,
        content: req.body.content,
        rating: req.body.rating
    }, function(err, sticky) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json({});
    });
});


//Allows users to log in 
app.get('/user', function(req,res){
    User.find(function(err, user){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(user);
    });
});

//Allows users to change
app.post('/user', jsonParser, passport.authenticate('basic', {
        session: false
    }), function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json({});
    });
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;