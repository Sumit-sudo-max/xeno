const express = require('express');
const connectDatabase = require('./db/db');
const app = express(); 
const dotenv = require('dotenv');

const User = require('./models/userModels');

// configuring 
dotenv.config({ 
    path:"backend/db/config.env"
});

//connecting database
connectDatabase();

app.use(express.json());
//Routes Import 
app.use(require("./routes/userRoutes"));

app.get("/",(req,res)=>{
    res.send("Sumit");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});