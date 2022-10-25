import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        allPayment: []
    },
    reducers: {
        allPayment: (state, { payload }) => {
            state.allPayment = payload
        }
    }
});

export const { allPayment } = paymentSlice.actions;

export default paymentSlice.reducer