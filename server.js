require('dotenv').config({path:'config/config.env'});
const app = require('./app.js');

//connect to the mongodb database
const connectDatabase = require("./config/mongoose.js");
const port = process.env.PORT || 8000

//error for eg:- make use of undeclared variables
process.on('uncaughtException',(err)=>{
    console.log('Error',`${err.message}`);
    console.log('Shutting down the server due to unhandled Exception');
    process.exit(1); 
})

const server = app.listen(port,()=>{
    console.log('server is loaded on Port : ',port);
})

// Unhandled Promise Rejection
process.on('unhandledRejection',(err)=>{
    console.log('Error',`${err.message}`);
    console.log('Shutting down the server due to unhandled Promise Rejection');

    server.close(()=>{
        process.exit(1);
    })
})