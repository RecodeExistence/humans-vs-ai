const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require("../config/db");
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();

//connect database
connectDB();

//initialize middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.use('/api/items', require('./routes/api/items'));

app.use(express.static(__dirname + '/public'))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.listen(PORT, HOSTNAME,() => {
    console.log(`Magic is happening at http://${HOSTNAME}:${PORT}`);
});