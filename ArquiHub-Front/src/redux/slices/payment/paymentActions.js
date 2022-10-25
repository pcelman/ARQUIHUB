import { PAYMENT } from "../constants"
import { allPayment } from "./paymentSlice";
const axios = require("axios")

export const getAllPayments = () => {
    return (dispatch) => {
      axios
        .get(PAYMENT)
        .then((info) => dispatch(allPayment(info.data)))
        .catch((err) => console.log(err));
    };
  };