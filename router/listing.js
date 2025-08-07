let express=require("express");
let router= express.Router();
let Listing=require("../models/listing.js");
let wrapAsync=require("../utils/wrapAsync.js")
let ExpressError=require("../utils/ExpressError.js")
let {listingSchema,reviewSchema}=require("../schema.js");
let {isLoggedIn,isOwner}=require("../middleware.js")
let listingController=require("../controllers/listing.js")
let multer=require("multer");
let {storage}=require("../cloudConfig.js");
let upload=multer({storage})

function validateListing(request,response,next){
 let {error}=listingSchema.validate(request.body);
     if(error){
        let err=error.details.map((el)=>{el.message}).join(',');
        throw new ExpressError(400,error)
     }
     else{
        next();
     }
}

//Home
router.route("/")
   .get(wrapAsync(listingController.index))
   .post(isLoggedIn,upload.single("image"),validateListing,wrapAsync(listingController.addListing))


//Add new listings
router.get("/new",isLoggedIn,listingController.renderNewForm )

//See a specific listing
router.route("/:id")
   .get(wrapAsync(listingController.seeListing))
//Edit listing
   .put(isLoggedIn,isOwner,upload.single("image"),validateListing,wrapAsync(listingController.updateListing)) 
//Delete listing
   .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteForm))


//See Edit listing form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))





module.exports=router