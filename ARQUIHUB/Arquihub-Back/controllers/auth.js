const { usersModel } = require("../models");
const { jwt, sign } = require("jsonwebtoken")
const { SECRET } = require("../config/config");
const emailer = require("../config/emailer")
const registerTemplate = require("../templates/register.js")

const signUp = async (req, res) => {
    try {
        const {
            name,
            lastname,
            nickname,
            email,
            password,
            type,
            posts,
            projects,
            favourites,
            status,
            avatar,
            job,
            description,
            location,
            page,
            premium
        } = req.body

        const findUser = await usersModel.find({ email })
        const findUserNick = await usersModel.find({ nickname })
        if(findUser.length && findUserNick.length) return res.status(400).json({errorMail:"Mail already registered", errorNick:"Nickname already registered"})
        else if(findUser.length) return res.status(400).send({errorMail:"Email already registered"})
        else if(findUserNick.length) return res.status(400).send({errorNick:"Nickname already registered"})

            const newUser = {
                name,
                lastname,
                nickname,
                email,
                password: await usersModel.encryptPassword(password),
                type,
                status,
                avatar: "https://res.cloudinary.com/dfcd64nhm/image/upload/v1666218608/avatar_vmuzdl.png",
                job,
                description,
                location,
                page,
                job,
                location,
                premium
            }
            
            const addUser = await usersModel.create(newUser)
            const token = sign({ id: addUser._id }, `${SECRET}`, { expiresIn: 86400 })
            const userId = addUser._id
            const userType = addUser.type
            const userAvatar = addUser.avatar
            const userMail = addUser.email
            const userName = addUser.name
            const isPremium = addUser.premium
            try {

                // emailer.sendMail(userMail, "Bienvenido a Arquihub!", registered(userName))
                emailer.sendMail(newUser.email, newUser.name ? `${newUser.name}, Welcome to Arquihub!` : `${newUser.nickname}, Welcome to Arquihub!`, registerTemplate)
            } catch (error) {
                console.log(error);
            }
            res.send({ token, userId, userType, userAvatar, userMail, userName, isPremium })


    } catch (error) {
        console.log(error)
        return res.status(400).send({ error:error.message })
    }
}




const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const findUser = await usersModel.findOne({ email })

        if (!findUser) return res.status(400).send({ errEmail: "Couldn´t find the user" })

        const matches = await usersModel.comparePassword(password, findUser.password)

        if (!matches) return res.status(400).send({ errPassword: "Invalid password" })

        const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
        const userId = findUser._id
        const userType = findUser.type
        const userAvatar = "https://res.cloudinary.com/dfcd64nhm/image/upload/v1666218608/avatar_vmuzdl.png"
        const userMail = findUser.email
        const userName = findUser.name
        const isPremium = findUser.premium

        res.send({ token, userId, userType, userAvatar, userMail, userName, isPremium })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}


const googleLogin = async (req, res) => {
    const { email, avatar, name, lastname } = req.body
    const findUser = await usersModel.findOne({ email })

    try {
        if (!findUser) {
            const newUser = {
                name: name,
                lastname: lastname,
                email: email,
                avatar: avatar,
                type: "user",
                nickname: email
            }
            const addUser = await usersModel.create(newUser)
            const token = sign({ id: addUser._id }, `${SECRET}`, { expiresIn: 86400 })
            const userId = addUser._id
            const userType = addUser.type
            const userAvatar = addUser.avatar
            const userMail = addUser.email
            const userName = addUser.name
            const isPremium = addUser.premium
            emailer.sendMail(userMail, "Bienvenido a Arquihub!", registerTemplate)

            res.status(200).send({ token, userId, userType, userAvatar, userMail, userName })

        } else {

            const token = sign({ id: findUser._id }, `${SECRET}`, { expiresIn: 86400 })
            const userId = findUser._id
            const userType = findUser.type
            const userAvatar = avatar
            const userMail = findUser.email
            const userName = findUser.name
            const userLastname = findUser.lastname
            const isPremium = findUser.premium

            res.status(200).send({ token, userId, userType, userAvatar, userMail, userName, userLastname })

        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error })
    }
}


module.exports = { signUp, logIn, googleLogin }