import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/stickies'); // connect to our database
import User from './models/user';
import Sticky from './models/sticky';
import bodyParser from 'body-parser';

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
//Allows users to see the sticky note
app.get('/user/stickies', function(req,res){
    Sticky.find(function(err, sticky){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(sticky);
    });
});
//Allows users to create the title for a sticky note
app.post('/user/stickies', jsonParser, function(req, res) {
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

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

app.post('/user', jsonParser, function(req, res) {
    User.create({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json({});
    });
});


exports.app = app;
exports.runServer = runServer;