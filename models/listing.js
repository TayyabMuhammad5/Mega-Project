let mongoose=require("mongoose")
let Review=require("./review.js")
let listingSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
   image: {
//   filename: {
//     type: String,
//     default: 'defaultImage'
//   },
//   url: {
//     type: String,
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//   }

    url:String,
    filename:String
},

    price:{
        type:Number,
        required:true

    },
    country:{
        type:String,
    },
    location:{
        type:String,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
      await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

let Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;