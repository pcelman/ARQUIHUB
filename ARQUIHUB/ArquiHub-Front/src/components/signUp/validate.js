export function validate (input, value = undefined, err = false){
  const {name,lastName,userName,email,password,confirmPassword} = input
  let errors = {};
  const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
  const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,14}$/igm

/* ----- Name validate ----- */
if(value === "name" || err.name || value === undefined ){
  if(!name.trim()) errors.name = "*Name is required"
  else if(!/^[A-Z]+$/i.test(name)) errors.name = "* Name only can have letters"
  else if(name.length>15) errors.name = "* Name can´t have 20 more characters"
}

/* ----- Last name validate ----- */
if(value === "lastName" || err.lastName || value === undefined){
  if(!lastName.trim()) errors.lastName = "*Lastname is required"
  else if(!/^[A-Z]+$/i.test(lastName)) errors.lastName = "* Lastname only can have letters"
  else if(lastName.length>15) errors.lastName = "* Lastname can´t have 20 more characters"
}
/* ----- User name validate ----- */
if(value === "userName" || err.userName || value === undefined){
  if(!userName.trim()) errors.userName = "*UserName is required"
  else if(!regexUserName.test(userName)){
    if(!/^.{0,14}$/igm.test(userName)) errors.userName = "* UserName can´t have more to 15 characters"
    else if (!/^(?!.*\.\.).{0,14}$/igm.test(userName)) errors.userName = "* Can´t repeat 2 or more dots in a row"
    else if (!/^(?!.*\.$)[^\.].{0,14}$/igm.test(userName)) errors.userName = "* Can´t start or end with dots"
    else{
      errors.userName ="* Invalid characters"
    }
  }
}
/* ----- Email validate ----- */
if(value === "email" || err.email || value === undefined){
  if(!regexEmail.test(email.trim())) errors.email = "*Invalid email address format"
  if(!email.trim()) errors.email = "*Email is required"
}

/* ----- Password validate ----- */
if(value === "password" || err.password || value === undefined){
  if(!password.trim()) errors.password = "*Password is required"
  else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)) errors.password="* Password must contain at least 8 characters, one uppercase, one lowercase and one number"
}
/* ----- confirmPassword validate ----- */
if(value === "confirmPassword" || err.confirmPassword || value === undefined){
  if(confirmPassword !== password) errors.confirmPassword= "* The password confirmation does not match"
  if(!confirmPassword.trim()) errors.confirmPassword = "* Confirm password is required"
}
  return errors
}