let mongoose =require("mongoose");
let Listing=require("E:/Web development/Mega-Project/models/listing.js");
let initdata=require("./data.js");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then((result)=>{console.log("Successful")}).catch((err)=>{console.log(err)});

async function insert(){
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'688dbf5c43694cc8b972c4c3'}))
    await Listing.insertMany(initdata.data)
}
insert();