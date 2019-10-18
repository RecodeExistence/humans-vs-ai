const express = require("express");
const connectDB = require("../config/db");
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.use(cors());

// define API routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use('/api/items', require('./routes/api/items'));

// Points to the Vue JS public folder
app.use(express.static(__dirname + '/public'))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started`);
});
