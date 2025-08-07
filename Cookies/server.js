//This is seperate from the project
let express=require("express");
let app=express();
let cookieParser=require("cookie-parser");
let port=3000;
app.listen(port,(request,response)=>{
    console.log("Server is listening")
})

app.use(cookieParser("secretcode"))

app.get("/signedCookie",(request,response)=>{
    response.cookie("color","green",{signed:true});
    response.send("Signed cookie send")
})
app.get("/",(request,response)=>{
    console.dir(request.signedCookies)
    response.send("Get from root page")
})

app.get('/getcookie',(request,response)=>{
    response.send("cookie send");
})

app.get("/greet",(request,response)=>{
    let {name="someone"}=request.cookies;
    response.send(`Hello ${name}`)
})