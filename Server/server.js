const express = require('express');
const connectDB = require("./config/db");

const app = express();
//connect database
connectDB();
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`);
});
