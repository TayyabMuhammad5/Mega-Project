let express=require("express");
let router= express.Router({mergeParams:true});
let Review=require("../models/review.js");
let wrapAsync=require("../utils/wrapAsync.js")
let ExpressError=require("../utils/ExpressError.js")
let {listingSchema,reviewSchema}=require("../schema.js");
let Listing=require("../models/listing.js");
let {isLoggedIn,isAuthor}=require("../middleware.js")

let reviewController=require("../controllers/review.js")

function validateReview(request,response,next){
 let {error}=reviewSchema.validate(request.body);
     if(error){
        let err=error.details.map((el)=>{el.message}).join(',');
        throw new ExpressError(400,error)
     }
     else{
        next();
     }
}


//Posting reviews on a specific listing
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview))

//Deleting a review
router.delete("/:reviews_id",isLoggedIn,isAuthor,reviewController.deleteReview);

module.exports=router