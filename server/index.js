import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import passport from 'passport';

import strategy from './endpoints/strategy';
import userRouter from './endpoints/userRouter';
import stickyRouter from './endpoints/stickyRouter';

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

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

export default app;
