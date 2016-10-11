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


//get all the stickies for now, this is for testing purposes atm

app.get('/stickies', passport.authenticate('basic', {session: false}), function(req, res) {
    Sticky.find(function(err, sticky) {
        if (err) {
            return res.status(500).json({message: 'Internal Server Error'});
        }

        return res.status(200).json(sticky);
    })
})

//Allows authorizied users to see their sticky notes
app.get('/users/:userId/stickies', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
    var routeId = req.params.userId;
    var authenticatedId = req.user._id.toString();

    if(routeId !== authenticatedId) {
         return res.status(422).json({
            "message": "you can't "
         });   
    }
    
});


//Allows users to create the title for their sticky notes
app.post('/users/:userId/stickies', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
    var id = req.params.userId;
    var name = req.body.name;
    var content = req.body.content;
    var authenticatedId = req.user._id.toString();

    Sticky.create({name: name, content: content, _user: authenticatedId}, function(err, sticky) {
        if(err) {
            return res.sendStatus(500);
        }

        return res.status(201).location("/users/" + authenticatedId + "/stickies/" + sticky._id).json({});
    })

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


app.post('/user', jsonParser, function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        })
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash
            });

            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                //   return res.status(201).json({});
                console.log('Username and password created');
                return res.status(201).location('/users/' + user._id).json({});
            });
        })

    });


});


exports.app = app;
exports.runServer = runServer;