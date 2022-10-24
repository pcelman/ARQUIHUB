import {createSlice} from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        user:{},
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state, action)=>{
            state.user = null
        },
        register:(state, action)=>{
            state.user = action.payload
        },
        googleLog:(state, action)=>{
            state.user = action.payload
        },
        clearLogin:(state,{payload})=>{
            state.user = payload
        },
        forgotPassword:(state,action)=>{
            state.user = action.payload
        },
        resetPassword:(state,action)=>{
            state.user = action.payload
    }}
})

export const {login,logout, register, googleLog, clearLogin, forgotPassword, resetPassword}= loginSlice.actions;

export default loginSlice.reducer