const { request } = require("express");
let Listing=require("./models/listing")
let Review=require("./models/review")

module.exports.isLoggedIn=(request,response,next)=>{
    if(!request.isAuthenticated()){
        request.session.redirectUrl=request.originalUrl;
        request.flash("error","You must be logged in")
        return response.redirect("/login")
    }
    next()
}

module.exports.saveUrl=(request,response,next)=>{
    if(request.session.redirectUrl){
        response.locals.redirectUrl=request.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(request,response,next)=>{
    let {id}=request.params;
     let listing=await Listing.findById(id)
   
    if(!listing.owner._id.equals(response.locals.currentUser._id)){
        request.flash("error","You are not the owner of this listing");
        return response.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor=async(request,response,next)=>{
    let {id,reviews_id}=request.params;
     let review=await Review.findById(reviews_id)
   
    if(!review.author._id.equals(response.locals.currentUser._id)){
        request.flash("error","You are not the owner of this review");
        return response.redirect(`/listings/${id}`);
    }
    next();
}