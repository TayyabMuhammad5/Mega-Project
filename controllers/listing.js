let Listing=require("../models/listing");

module.exports.index= async (request,response)=>{
let allListings=await Listing.find({});
response.render("listings/index.ejs",{allListings})
}

module.exports.renderNewForm=(request,response)=>{
response.render("listings/form.ejs");
}

module.exports.seeListing=async (request,response)=>{
let {id}=request.params;
let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
if(!listing){
    request.flash("error","listing does not exists");
    return response.redirect("/listings")
}
response.render("listings/listing.ejs",{listing});
}

module.exports.addListing=async(request,response,next)=>{
    let {path,filename}=request.file;
    console.log(path,filename)
 let {title,price,location,country,description}=request.body;
    let newListing=new Listing({
        title:title,
        price:price,
        location:location,
        country:country,
        description:description
    });
    newListing.image={url:path,filename};
    newListing.owner=request.user._id;
     await newListing.save();
    request.flash("success","New listing created");
    response.redirect("/listings");  
}

module.exports.renderEditForm=async (request,response)=>{
  let {id}=request.params;
    let listing=await Listing.findById(id);
    if(!listing){
    request.flash("error","listing does not eoists");
    response.redirect("/")
}
let updatedUrl=listing.image.url;
updatedUrl=updatedUrl.replace("/upload","/upload/h_200,w_250")
response.render("listings/edit.ejs",{listing,updatedUrl});
}

module.exports.updateListing=async (request,response)=>{
  let {id}=request.params;
  let {title,price,location,country,description}=request.body;
    let newListing={
        title:title,
        price:price,
        location:location,
        country:country,
        description:description
    };
     let listing=await Listing.findByIdAndUpdate(id,newListing);
      if(typeof request.file !== "undefined"){
    let {path,filename}=request.file;
    listing.image={url:path,filename};
     await listing.save();
      }
   
    request.flash("success","listing edited");
response.redirect(`/listings/${id}`);
}

module.exports.deleteForm=async(request,respnse)=>{
    let {id}=request.params;
    await Listing.findByIdAndDelete(id);
    request.flash("success"," listing deleted");
    respnse.redirect("/listings");
}