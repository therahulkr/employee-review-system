const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    rating : {
        type:Number,
        default:0
    },
    from:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Person'
    },
    for : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Person'
    }
},{
   timestamps:true
})


module.exports = mongoose.model('reviews',reviewSchema);

// const { Schema, model } = require("mongoose");

// creating the schema
// const performanceSchema = new Schema(
//   {
//     reviewBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     reviewFor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     ranking:{
//       type:Number,
//       min: [1, "minimum ranking 1 is lowest"],
//       max: [10, "higest ranking is 10"],
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     feedback: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Feedback",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );
// // creating model from the schema
// const Performance = model("Performance", performanceSchema);
// module.exports = Performance;