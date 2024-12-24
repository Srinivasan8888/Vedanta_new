const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const AuthRoute = require('./API/Router/Auth.route')
const InsertRoute = require('./API/Router/Insert.route')
const ApiRoute = require('./API/Router/Api.route')
require('./Helpers/init_mongodb')
const { verifyAccessToken } = require('./Helpers/jwt_helper')
// const client = require('./Helpers/init_redis')
require('./Helpers/init_redis')
require('./Helpers/init_websocket')
const cors = require("cors");


// client.SET('foo', 'bar')
// client.GET('foo', (err,value) => {
//     if(err) console.log(err.message)
//     console.log(value)
// })

const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vedanta');
        console.log('Mongodb Connected..');
    } catch (error) {
        throw error;
    }      
};

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB!');
// });

// mongoose.connection.on('disconnected', () => {
//     console.log('Mongodb disconnected...');
// });

app.get('/', verifyAccessToken, async (req, res, next) => {
    console.log(req.headers['authorization'])
   res.send('backend is running')
})

app.use('/auth', AuthRoute);
app.use('/api/v1', InsertRoute);
app.use('/api/v2', ApiRoute);

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

app.get('/', (req, res) => {
    res.json({ message: "Backend is running" });
})

// app.use(async (req, res, next) => {
//     // const error = new Error('Not Found')
//     // error.status = 404
//     // next(error)
//     next(createError.NotFound('This API Doesn\'t exist'))
// })


app.listen(port, () => {
    connect();
    console.log("backend is running on port:", port)
})