const express = require("express");
const router = express.Router();
const { usersModel } = require("../models");
const { signUp, logIn, googleLogin } = require("../controllers/auth");
const emailer = require("../config/emailer");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");
const JWT_SECRET = "some super secret";
const { encryptPassword } = require("../models/User");
const resetTemplate = require("../templates/resetPass");

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/google", googleLogin);

router.post("/forgotPassword", async (req, res, next) => {
  const { email } = req.body;
  try {
    const findUser = await usersModel.findOne({ email });
    if (!findUser)   return res.status(200).json({errEmail:"User Not registered"})

    //user exist send link for 15 minutes
    const secret = JWT_SECRET + findUser.password;
    const payload = {
      email: findUser.email,
      id: findUser._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    const link = `http://localhost:3000/resetPassword/${findUser._id}/${token}`;
    emailer.sendMail(
      email,
      "Forgotten password link",
      ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body>
    <p style="color: black; font-family: sans-serif;">  <strong>ARQUI</strong>HUB</p>
    <p style="color: black; font-family: sans-serif;"> Hi, here is your link to reestablish your forgotten password:</p>
    <p style="color: black; font-family: sans-serif ; line-height: 1.6"> <b><a href= ${link}> Reset Password</a></b></br>
        <br>
        Explore everything we have for you: 
    </br> 
   
        <a href="https://arquihub-git-main-frann24.vercel.app/home" style=" font-family: sans-serif ; line-height: 1.6"> Go take a look!</a>
    </br>
</br>
        <p style=" font-family: sans-serif ; line-height: 1.6"> Any questions? </p> 
        <a href="mailto: arquihub06@gmail.com? subject=subject text" style="font-family: sans-serif ; line-height: 1.6"> Contact us </a>

</body>
</html>
 `
    );
    res.status(200).json({ success: "Password Reset Link sent to your email" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/resetPassword/:id/:token", async (req, res, next) => {
  //    const {} = req.params
  const { id, token, email, password, password2 } = req.body;
  try {
    const findUser = await usersModel.findOne({ email });
    if (id !== findUser.id) return res.send("Invalid id");
  
    const newToken = jwt.sign({ id: findUser._id }, SECRET, { expiresIn: 86400 });
    if (findUser.password){
        const matches = await usersModel.comparePassword(password, findUser.password)
        if (matches) return res.status(200).send({ errPassword: "The password cannot be the same as the previous one" })
    }

    const updated = await usersModel.findByIdAndUpdate(id, {
      password: await usersModel.encryptPassword(password),
    });
  
    emailer.sendMail(email, `Password reestablished`, resetTemplate);
  
    // `<div>
    //     <p>You can now login with your new password</p>
    //     <p> http://localhost:3000/home  </p>
    // </div`)
  
    res.status(200).send({success:"Password updated succesfully"});
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
});

module.exports = router;
