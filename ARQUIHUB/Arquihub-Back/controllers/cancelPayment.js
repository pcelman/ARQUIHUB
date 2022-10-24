const { usersModel } = require("../models");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const emailer = require("../config/emailer");
const {payAccepted, subscriptionCancel } = require("../utils/templates/payment")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 


const cancelSubscription = async (req, res) => {

  try {    
    
    const { userId, emailUser } = req.body
    
    const user = await usersModel.findById(userId)

    const stripeCustomer = await stripe.customers.retrieve(user.idStrpe, {expand: ['subscriptions']})

   
    const subscriptionId = await stripe.subscriptions.update(stripeCustomer.subscriptions.data[0].id, {cancel_at_period_end: true})

    emailer.sendMail(emailUser, "Subscription Cancel", subscriptionCancel)
    
    //console.log(subscriptionId)

    

  res.json(subscriptionId)

} catch (error) {
    res.status(400).send('Error Subscription Cancel')
  }
};


module.exports = {
  cancelSubscription
  
}