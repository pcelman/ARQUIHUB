export function validate (input, value = undefined, err = false){
  const {email, password} = input
  let errors = {};
  const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
  
/* ----- Email validate ----- */
if(value === "email" || err.email || value === undefined ){
  if(!regexEmail.test(email.trim())) errors.email = "Invalid email address format"
  if(!email.trim()) errors.email = "Email is required"
}
/* ----- Password validate ----- */
if(value === "password" || err.password || value === undefined ){
  if(!password.trim()) errors.password = "Password is required"
}
  return errors
}