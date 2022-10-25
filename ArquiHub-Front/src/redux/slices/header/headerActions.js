import { showMenu, showSigIn, showSignUp } from "./headerSlice"

export const changeShowMenu = (show) => {
  return showMenu(show)
}
export const changeShowSingIn = (show) => {
  return showSigIn(show)
}
export const changeShowSingUp = (show) => {
  return showSignUp(show)
}