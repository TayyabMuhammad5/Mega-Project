const mongoose=require("mongoose");
const { type } = require("../schema");

let reviewSchema=new mongoose.Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    time:{
        type:Date,
        date:Date.now
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    }
})

let Review=mongoose.model("Review",reviewSchema);
module.exports=Review;