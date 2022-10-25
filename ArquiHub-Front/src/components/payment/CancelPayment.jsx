import { useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  //useStripe,
  //useElements
} from "@stripe/react-stripe-js";
import { CANCEL_PAYMENT } from "../../redux/slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/slices/user/userActions";

//import "bootswatch/dist/lux/bootstrap.min.css";

const axios = require("axios");

const stripePromise = loadStripe(
  "pk_test_51LoIVcAfxOW2aSoAIaQduZj78BZ0WSIkqQ6HtJ7eLxdgVvUgP1VQzKUvKp4Cxvqb1IGxfwGdDckLpNODYg6BJ51k00iHLR6VrB"
);
const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
const {user} = useSelector(state=>state.user)
const dispatch = useDispatch()
useEffect(() => {
  dispatch(getUser(token.userId))
}, [dispatch])

  const handleCancelSubscription = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(CANCEL_PAYMENT, {
        userId: token.userId,
        emailUser: token.userMail,
      });
      console.log(res.data);
      const { cancel_at_period_end } = res.data;

      if (cancel_at_period_end === true) {
        console.log("Suscripcion cancelada!!!");
        navigate("/cancelPaymentOk");
      } else {
        console.log("Error Suscripcion!!!");
        navigate("/cancelPaymentError");
      }
    } catch (error) {
      console.log(error);
    }
    //setLoading(false)
  };
  if(!user.premium){
    navigate("/home")
    return
  }
    return (
      <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">
          <div className="mt-20 text-xl">
            By canceling your subscription you will continue to enjoy Premium
            benefits until the end of the subscription period. 
            <br/>Remember, you can
            go back to Premium anytime.
          </div>
          <div>
            <form onSubmit={handleCancelSubscription}>
              <button className="bg-black text-white px-6 mt-6">
                Cancel Subscription
              </button>
            </form>
          </div>
      </div>
    );

};

function CancelSubscription() {
  
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div class="container-pago">
          <div>
            <div>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
}

export default CancelSubscription;
