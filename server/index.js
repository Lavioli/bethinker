import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect('http://127.0.0.1:3306'); // connect to our database
import UserSchema from 'User';
import StickySchema from 'Sticky';

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
app.get('/stickies', function(req,res){
    StickySchema.find(function(err, sticky){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(sticky);
    });
});
//Allows users to create the title for a sticky note
app.post('/stickies', function(req, res) {
    Sticky.create({
        title: req.body.title
    }, function(err, sticky){
        if (err) {
            return res.status(500).json ({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(sticky);
    });
})