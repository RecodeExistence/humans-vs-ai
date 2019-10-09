const express = require('express');
const connectDB = require("./config/db");
const path = require('path');

const app = express();
//connect database
connectDB();

//initialize middleware
app.use(express.json({ extended: false }));
//define routes
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname,'dist','index.html'));
});
app.use("/users", require("./Server/routes/users"));
app.use("/auth", require("./Server/routes/auth"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`);
});
