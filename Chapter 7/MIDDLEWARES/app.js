const express= require("express");
const app= express();
const port= 8080;

//Middleware->Response send

// app.use((req, res, next)=>{
//     // let  { query } = req.query;
//     // console.log( query );   //Show we can access the request and response
//     console.log("Hello I am MIDDLEWARE 1");
//     // res.send("MIDDLEWARE FINISHED");
//     return next();
//     console.log("Function after MIDDLEWARW 1");     //NOT EXECUTE
// })

// app.use((req, res, next)=>{
//     console.log("Hello I am MIDDLEWARE 2");
//     next();
// })

// LOGGER

app.use((req, res, next)=>{
    req.time= new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    return next();
})

app.use("/api", (req, res, next)=>{
    let { token }= req.query;
    if(token=== "giveaccess"){
        return next();
    }
    else{
        console.log("API ACCESS DENIED!");
        res.send("API ACCESS DENIED!");
    }
})

app.get("/api", (req, res)=>{
    console.log("Getting request on API");
    res.send("Getting request on API");
})

app.use("/random", (req, res, next)=>{
    console.log("I am only for RANDOM");
    return next();
})

app.get("/", (req, res)=>{
    console.log("Getting Request on ROOT page")
    res.send("Getting Request on ROOT page");
})

app.get("/random", (req, res)=>{
    console.log("Getting request on RANDOM page");
    res.send("Getting request on RANDOM page");
})

app.use((req, res, next)=>{
    res.send("!PAGE NOTE FOUND!");
})

app.listen(port, ()=>{
    console.log("Listening to to port 8080");
})