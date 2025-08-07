if(process.env.NODE_ENV!="production"){
    require("dotenv").config()
}
let express=require("express");
let app=express();
let path=require("path");
let methodOverride=require("method-override");
let ejsMate=require("ejs-mate");
app.use(methodOverride("_method"));
let mongoose=require("mongoose")
let ExpressError=require("./utils/ExpressError.js")
let listings=require("./router/listing.js")
let reviews=require("./router/reviews.js")
let users=require("./router/users.js")
let session=require("express-session");
let MongoStore=require("connect-mongo")
let flash=require("connect-flash");
let passport=require("passport");
let localStretegy=require("passport-local");
let User=require("./models/user.js")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")))
async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    await mongoose.connect(process.env.ATLASDB_URL)
}
main().then((result)=>{console.log("Successful")}).catch((err)=>{console.log(err)});

let port=8080;

const store=MongoStore.create({
    mongoUrl:process.env.ATLASDB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})
store.on("error",()=>{
    console.log("Error in mongo storage session",err)
})
let sessiobOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessiobOptions));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStretegy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((request,response,next)=>{
    response.locals.success=request.flash("success");
    response.locals.error=request.flash("error");
    response.locals.currentUser=request.user;
    next();
})

app.use("/listings",listings)

app.use("/listings/:id/reviews",reviews);

app.use("/",users)

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})



app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err,request,response,next)=>{
    let {status=500,message="Error"}=err;
    response.status(status).render("listings/error.ejs",{message})
 
})


