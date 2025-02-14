import express from "express";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import createError from 'http-errors';
import dotenv from 'dotenv';
import AuthRoute from './API/Router/Auth.route.js';
import InsertRoute from './API/Router/Insert.route.js';
import ApiRoute from './API/Router/Api.route.js';
import './Helpers/init_mongodb.js';
import { verifyAccessToken } from './Helpers/jwt_helper.js';
// import client from './Helpers/init_redis.js';
import './Helpers/init_redis.js';
import './Helpers/init_socketio.js';

import cors from "cors";


// client.SET('foo', 'bar')
// client.GET('foo', (err,value) => {
//     if(err) console.log(err.message)
//     console.log(value)
// })

const app = express();
const ports = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:3000', // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'x-client-id',
    'x-client-ip'
  ]
}));

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


app.get('/', verifyAccessToken, async (req, res, next) => {
    console.log(req.headers['authorization'])
   res.send('backend is running')
})

app.use('/auth', AuthRoute, cors());
app.use('/api/v1', InsertRoute);
app.use('/api/v2', ApiRoute);

// Add explicit OPTIONS handler for /auth/verify
app.options('/auth/verify', cors());

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

// app.get('/', (req, res) => {
//     res.json({ message: "Backend is running" });
// })

app.listen(ports, () => {
    connect();
    console.log("backend is running on port:", ports)
})