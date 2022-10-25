export function validate (form, value = undefined, err = false, premium){
    const {title, description, project_file, pdf_file, visibility,projects} = form
    let errors = {};
    
  /* ----- Email validate ----- */
  if(value === "title" || err.title || value === undefined ){
    if(!title.trim()) errors.title = "Title is required"
  }
  /* ----- Password validate ----- */
  if(value === "description" || err.description || value === undefined ){
    if(!description.trim()) errors.description = "Description is required"
  }
    console.log(visibility)
  if(value=== "visibility" || err.visibility && err.visibility.value || value === undefined){
    if(visibility.value === "private" && !premium ) errors.visibility = "Private project is a premiun functionality."
  }
  return errors
  }
  