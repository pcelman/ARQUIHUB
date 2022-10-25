const { usersModel, paymentModel } = require("../models");
const Stripe = require("stripe")
const nodemailer = require("nodemailer");
const { SIGN_SECRET_PRUEBA, SIGN_SECRET, STRIPE_SECRET_KEY } = process.env;
const emailer = require("../config/emailer");
const { postPaymentSubscription } = require("./payment");
const { subscriptionCycleEnded } = require("../utils/templates/payment")


let subscription = "";
let endpointSecret = SIGN_SECRET // pasarlo como variable de entorno
const stripe = new Stripe(STRIPE_SECRET_KEY)

const getWebhooks =  async (req, res) => {
  res.status(200).send("ALO")
  console.log("OK")
  
}


const postWebhooks = async (request, response) => {
  let sig = request.headers["stripe-signature"]; //cada vez que alguien paga algo se genera este header
  
  let event;

  try {
    // se comprueba si el evento viene de stripe
    event = await stripe.webhooks.constructEventAsync(request.body, sig, endpointSecret);
    //console.log(event)
    subscription = event.data.object;
    //console.log(subscription)
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
  // Handle the event
  switch (event.type) {       
    case 'customer.subscription.created':
      subscription = event.data.object;
      const idCustomerStripe = subscription.customer
      const idSubscriptionStripe = subscription.id
      const newPayment = { idCustomerStripe, idSubscriptionStripe}

      await paymentModel.create(newPayment)

      //console.log(newPay)
      

      //const user = await usersModel.findOne({idStrpe:subscription.customer})
      // Then define and call a function to handle the event customer.subscription.created
      break;   
    case "customer.subscription.deleted":
      subscription = event.data.object;
      
    
      try{        
      const user = await usersModel.findOne({idStrpe:subscription.customer})
      user.premium = false;
      user.save()

      const subscriptionDb = await paymentModel.findOne({idCustomerStripe:subscription.customer})
      subscriptionDb.active = false;
      subscriptionDb.save()

      const userData = await usersModel.findOne({idStrpe:subscription.customer})
      const emailUser = userData.email
    

      emailer.sendMail(emailUser, "Subscription Ended", subscriptionCycleEnded)   

      response.send("Cancel OK")
                
        
      } catch(error){
        response.status(404).send("hubo un error en la cancelacion")
      }
      
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    
    default:
      //console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
  
};


module.exports = {
  postWebhooks,
  getWebhooks
}