const express = require("express");
const bcrypt = require('bcrypt');
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());a

app.get('/', (req, res) =>{
    res.json({ message: "Backend is running"});
})

app.listen(port, () =>{
    console.log("backend is running on port:",port)
})