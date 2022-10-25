const {jwt, verify} = require("jsonwebtoken")
const { SECRET } = require("../config/config");
const {usersModel} = require("../models")

const verifyToken = async(req,res,next)=>{
try {
    const token = req.headers["x-access-token"]

    if(!token) return res.status(400).send("No token provided")

    const decoded = verify(token, SECRET)
    console.log(decoded)
    req.userId = decoded.id

   const user = await usersModel.findById(req.userId, {password:0})
    if(!user) return res.status(400).send("User not found")

   next()
} catch (error) {
    console.log(error)
    return res.status(400).send("Unauthorized access")
}


}
//ej de token para testear
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzRmNGJjMTQ5ZDM3Y2Y5ZTc5NDgzMyIsImlhdCI6MTY2NDQxNzE3NCwiZXhwIjoxNjY0NTAzNTc0fQ.oSmQ5jPzDJ048uithUlU39T53BuG-CqSUlzPL5VnoiM


const isMember = async(req,res,next)=>{
    const user = await usersModel.findById(req.userId)
    console.log(user)
    if(user && user.type !== "user"){
        next()
        return
    }
    return res.status(400).send("membership type required")
}



const isAdmin = async(req,res,next)=>{
    const user = await usersModel.findById(req.userId)
    console.log(user)
    if(user && user.type == "admin" || user.type === "superadmin"){
        next()
        return
    }
    return res.status(400).send("Admin type required")
}



const isSuperAdmin = async(req,res,next)=>{
    const user = await usersModel.findById(req.userId)
    console.log(user)
    if(user && user.type === "superadmin"){
        next()
        return
    }
    return res.status(400).send("Superadmin type required")
}




module.exports = {verifyToken, isMember, isAdmin, isSuperAdmin}