export function CreateReviewValidation (input){
  const {value,comment} = input
  let errors = {};
/* ----- value ----- */
  if(!value) errors.value = "*value required"
  else if(!value>=1 && !value<=5) errors.value = "* value can be only 1 to 5 stars"
  else if(!/^\d+$/.test(value)) errors.value = "value can be only a number "
/* ----- Comment ----- */
  if(!comment.trim()) errors.comment = "Comment req value"
  return errors
}