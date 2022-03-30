const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true 
    },
    isadmin:{
        type : Boolean,
        required : true
    }
},{
   timestamps:true
})


module.exports = mongoose.model('Person',personSchema);