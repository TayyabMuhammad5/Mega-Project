let User=require("../models/user");

module.exports.renderSignupPage=(request,response)=>{
    response.render("users/signup.ejs")
}

module.exports.Signup=async(request,response,next)=>{
    try{
 let {email,username,password}=request.body;
    let newUser=new User({email,username});
    let user=await User.register(newUser,password);
    console.log(user);
    request.logIn(user,(err)=>{
      if(err){
        return next(err);
      }
    request.flash("success","User saved")
    response.redirect("/listings")
    })
  
    }
   catch(err){
    request.flash("error",err.message);
    response.redirect("/signup")
   }
}

module.exports.renderLoginPage=(request,response)=>{
    response.render("users/login.ejs")
}

module.exports.login=(request,response)=>{
    request.flash("success","You are logged in");
    let url=response.locals.redirectUrl || "/listings"
    response.redirect(url)
}

module.exports.logout=(request,response,next)=>{
    request.logOut((err)=>{
        if(err){
            return next(err);
        }
        request.flash("success","You have been logged out successfully!")
        response.redirect("/listings")
    })
}