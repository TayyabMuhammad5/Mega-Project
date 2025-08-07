let express=require("express");
let app=express();
let path=require("path");
let session=require("express-session");
let flash=require("connect-flash")
let port=3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(session({secret:"supersecret",resave:false,saveUninitialized:true}))
app.use(flash())

app.use((request,response,next)=>{
    response.locals=message=request.flash("success")
    next()
})

app.get("/",(request,response)=>{
    response.send("Session id");
})

// app.get("/requestcount",(request,response)=>{
//     if(request.session.count){
//         request.session.count++;
//     }
//     else{
//         request.session.count=1
//     }
//     response.send(`Request sent ${request.session.count} times`);
// })

app.get("/register",(request,response)=>{
    let {name="Somebody"}=request.query
    request.session.name=name;
    request.flash("success",'User registered successfully');
    response.redirect("/hello")
})

app.get("/hello",(request,response)=>{
    
    response.render("flash.ejs");
})

app.listen(port,(request,response)=>{
    console.log("Server is listening");
})
