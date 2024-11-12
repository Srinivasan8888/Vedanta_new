const express = require("express");
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const connect = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vedanta');
        console.log('Mongodb Connected..');
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('disconnected',()=>{
    console.log('Mongodb disconnected...');
});

app.get('/', (req, res) =>{
    res.json({ message: "Backend is running"});
})

app.listen(port, () =>{
    connect();
    console.log("backend is running on port:",port)
})