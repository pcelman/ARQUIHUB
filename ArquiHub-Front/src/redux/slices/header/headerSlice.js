import {createSlice} from '@reduxjs/toolkit'

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    menu: false,
    modalSignIn: false,
    modalSignUp: false,
  },
  reducers:{
    showMenu : (state, {payload}) =>{
      state.menu = payload
    },
    showSigIn : (state, {payload}) => {
      state.modalSignIn = payload
    },
    showSignUp : (state, {payload}) => {
      state.modalSignUp = payload
    }
  }
})

export const {showMenu, showSigIn, showSignUp} = headerSlice.actions

export default headerSlice.reducer