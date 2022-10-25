import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import CardSectionStyles from "./CardSectionStyles.css";
//import "bootswatch/dist/lux/bootstrap.min.css";
import { PAYMENT } from "../../redux/slices/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; //este es para solid
import { faXmark } from "@fortawesome/free-solid-svg-icons"; //este es para solid
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/user/userActions";
const axios = require("axios");

const stripePromise = loadStripe(
  "pk_test_51LoIVcAfxOW2aSoAIaQduZj78BZ0WSIkqQ6HtJ7eLxdgVvUgP1VQzKUvKp4Cxvqb1IGxfwGdDckLpNODYg6BJ51k00iHLR6VrB"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
const {user} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    
    token && dispatch(getUser(token.userId))
  }, [dispatch])

  const handleSubmitSubscription = async (e) => {
    e.preventDefault();
    //console.log(token.userName)
    if (!stripe || !elements) {
      return;
    }



    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardNumberElement,
        CardExpiryElement,
        CardCvcElement
      ),
      billing_details: {
        email: token.userMail,
      },
    });
    //setLoading(true)
    //console.log(result.paymentMethod.billing_details.email);
    //pm_1LsJmlAfxOW2aSoALMIBcJ5f

    if (result.error) {
      //console.log(result.error.message);
    } else {
      try {
        const res = await axios.post(PAYMENT, {
          payment_method: result.paymentMethod.id,
          email: token.userMail,
          userId: token.userId,
        });
        //console.log(res.data)
        const { client_secret, status } = res.data;

        if (status === "requires_action") {
          stripe.confirmCardPayment(client_secret).then(function (result) {
            if (result.error) {
              console.log("There was an issue");
              console.log(result.error);
              navigate("/errorPayment");
            } else {
              console.log("You got the money");
              //navigate("/successful")
            }
          });
        } else {
          console.log("You got the money");
          elements
            .getElement(CardNumberElement, CardExpiryElement, CardCvcElement)
            .clear();
          navigate("/successful");
        }
      } catch (error) {
        console.log(error);
        navigate("/errorPayment");
      }
      //setLoading(false)
    } 
  };
//className="container md:mx-8 lg:mx-16 xl:mx-32"

if(user.length===0 && !token || user.premium){
  navigate("/home")
  return
}
  return (
    <div>
      <div >
        <div className="container mx-auto grid justify-items-center">
          <h1 className="text-2xl mt-12 mb-6 ">
            Choose the right plan for you
          </h1>
        </div>

        <div className="container mx-auto ">
          <div className="lg:block hidden">
            <div
              className="container bg-gray-100 
                        grid grid-cols-3
                        justify-items-center
                        items-center
                        h-64 w-full my-4 mr-30 ml-50"
            >
              <div className="w-40"></div>
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Free
              </div>
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Premium
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Publication
              </div>
              <div className="text-red-600">
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className="text-green-600">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Number of Projects
              </div>
              <div className="w-40 text-center sm:text-sm">3</div>
              <div className="w-40 text-center sm:text-sm">Unlimited</div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Project Privacy
              </div>
              <div className="w-40 text-center sm:text-sm">Public only</div>
              <div className="w-40 text-center sm:text-sm">Public/Private</div>
            </div>
          </div>

          {/* segundo  */}
          <div className="lg:hidden md:block hidden">
            <div
              className="container bg-gray-100
                        grid grid-cols-3
                        justify-items-center
                        items-center
                        h-64 w-full my-4 mr-6"
            >
              <div className="w-40"></div>
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Free
              </div>
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Premium
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Publication
              </div>
              <div className="text-red-600">
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className="text-green-600">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Number of Projects
              </div>
              <div className="w-40 text-center sm:text-sm">3</div>
              <div className="w-40 text-center sm:text-sm">Unlimited</div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Project Privacy
              </div>
              <div className="w-40 text-center sm:text-sm">Public only</div>
              <div className="w-40 text-center sm:text-sm">Public/Private</div>
            </div>
          </div>

        {/* tercer */}

        <div className="block md:hidden">
            <div
              className="container bg-gray-100 max-width: 640px 
                        grid grid-cols-
                        justify-items-center
                        items-center
                        h-64 w-full my-4"
            >
              <div className="w-40"></div>
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Free
              </div>
              {/* <div className="w-40 text-center font-medium sm:text-sm">
                Premium
              </div> */}
              <div className="w-40 text-center font-medium sm:text-sm">
                Publication
              </div>
              <div className="text-red-600">
                <FontAwesomeIcon icon={faXmark} />
              </div>
              {/* <div className="text-green-600">
                <FontAwesomeIcon icon={faCheck} />
              </div> */}
              <div className="w-40 text-center font-medium sm:text-sm">
                Number of Projects
              </div>
              <div className="w-40 text-center sm:text-sm font-light">3</div>
              {/* <div className="w-40 text-center sm:text-sm">Unlimited</div> */}
              <div className="w-40 text-center font-medium sm:text-sm">
                Project Privacy
              </div>
              <div className="w-40 text-center sm:text-sm font-light">Public only</div>
              {/* <div className="w-40 text-center sm:text-sm">Public/Private</div> */}
            </div>
            <div
              className="container bg-gray-100 max-width: 640px 
                        grid grid-cols-
                        justify-items-center
                        items-center
                        h-64 w-full my-4"
            >
              <div className="w-40"></div>
              {/* <div className="w-40 text-center font-medium sm:text-sm">
                Frooooo chiquito
              </div> */}
              <div className="w-40 text-center font-medium sm:text-sm underline">
                Premium
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Publication
              </div>
              {/* <div className="text-red-600">
                <FontAwesomeIcon icon={faXmark} />
              </div> */}
              <div className="text-green-600">
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Number of Projects
              </div>
              {/* <div className="w-40 text-center sm:text-sm">3</div> */}
              <div className="w-40 text-center sm:text-sm font-light">Unlimited</div>
              <div className="w-40 text-center font-medium sm:text-sm">
                Project Privacy
              </div>
              {/* <div className="w-40 text-center sm:text-sm">Public only</div> */}
              <div className="w-40 text-center sm:text-sm font-light">Public/Private</div>
            </div>
          </div>

        </div>

        <div className="container mx-auto mb-10">
          <div className="container grid justify-items-center mb-4">
            <h1 className="text-2xl mt-8 mb-2 ">Daily subscription: $1</h1>
            <p className="mb-6">Automatically renued, can be stopped anytime</p>
          </div>
          <form onSubmit={handleSubmitSubscription}>
            <div className="container mx-auto justify-items-center max-width: 640px h-64 w-full">
              <div className="container mx-auto w-96 justify-items-center">
                <div>
                  <p className="text-xs">Card Number</p>
                </div>
                <div className="mb-4">
                  <CardNumberElement />
                </div>
                <div>
                  <p className="text-xs">Expires</p>
                </div>
                <div className="mb-4">
                  <CardExpiryElement />
                </div>
                <div>
                  <p className="text-xs">Code Security</p>
                </div>
                <div className="mb-4">
                  <CardCvcElement />
                </div>
                <div className="container mx-auto mb-10">
                  <button
                    className="bg-green-600 text-white px-6 mt-6 ml-36"
                    disabled={!stripe}
                  >
                    Subscription
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div>
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

export default Payment;
