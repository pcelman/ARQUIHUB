//configuracion:
const express = require("express")
const server = express()
const morgan = require("morgan")
//middleware
function logger(req, res, next){
    console.log(req.url)
    next()
}
server.use(morgan("dev"))

server.get("/", logger, (req, res, next)=>{
   // res.send("Bienvenida Paula a tu app")
   console.log("previo al ext")
   next()
})

server.get("/", (req, res)=>{
    res.type("html")
    res.send("Bienvenidos a nuestro server luego de un next")
})

server.get("/json", (req, res)=> {
    res.json({message: "Hola, ruta /json"})
})

server.get("/send", (req, res) =>{
    res.send({message: "I am sending info"})
})
server.listen(3000, ()=>{console.log("Listening on port 3000")})
