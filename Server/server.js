const express = require('express');
const connectDB = require("../config/db");
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
//connect database
connectDB();

//initialize middleware
app.use(express.json({ extended: false }));
//define routes
app.use(express.static(__dirname + '/public'))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`);
});