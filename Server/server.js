const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const AuthRoute = require('./API/Router/Auth.route')
require('./Helpers/init_mongodb');
 
const cors = require("cors");
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

app.use('/auth', AuthRoute);

app.use(async (req, res, next) => {
    // const error = new Error('Not Found')
    // error.status = 404
    // next(error)
    next(createError.NotFound('This API Doesn\'t exist'))
})

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

app.listen(port, () => {
    connect();
    console.log("backend is running on port:", port)
})