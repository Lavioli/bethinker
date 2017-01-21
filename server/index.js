var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

var strategy = require('./endpoints/strategy'),
    userRouter = require('./endpoints/userRouter'),
    stickyRouter = require('./endpoints/stickyRouter');

var app = express();

var HOST = process.env.HOST,
    PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost:27017/stickies');
app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/', stickyRouter);
passport.use(strategy);

console.log(`Server running in ${process.env.NODE_ENV} mode`);

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

module.exports = app;
