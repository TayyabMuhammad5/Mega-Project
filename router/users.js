let express=require("express");
const wrapAsync = require("../utils/wrapAsync");
let User=require("../models/user")
let router= express.Router();
let passport=require("passport")
let {saveUrl}=require("../middleware.js")

let userController=require("../controllers/user.js");
const user = require("../models/user");

router.route("/signup")
   .get(userController.renderSignupPage)
   .post(wrapAsync(userController.Signup))

router.route("/login")   
    .get(userController.renderLoginPage)
    .post(saveUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login)

router.get('/logout',userController.logout)

module.exports=router;