const express=require("express");
const mongoose=require("mongoose");
const server=express();
require('dotenv').config();


const bodyParser = require('body-parser');
const cors = require('cors');

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

server.get('/',(request,response)=>{
    response.send('serever is running');
})

require("./routes/user.routes")(server);


server.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
})

