let Review=require("../models/review");
let Listing=require("../models/listing")
module.exports.postReview=async (request,response,next)=>{
    let {id}=request.params;
    let listing=await Listing.findById(id);
    console.log(request.body.review);
    let newReview=new Review(request.body.review)
    newReview.author=request.user._id
    await newReview.save();
    console.log(newReview);
    listing.reviews.push(newReview);
    await listing.save();
    request.flash("success","New review created");
    response.redirect(`/listings/${id}`);
}

module.exports.deleteReview=async(request,response)=>{
    console.log(123);
    let {id,reviews_id}=request.params;
   await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviews_id }
  });

  await Review.findByIdAndDelete(reviews_id);
  request.flash("success","review deleted");
   response.redirect(`/listings/${id}`);

}