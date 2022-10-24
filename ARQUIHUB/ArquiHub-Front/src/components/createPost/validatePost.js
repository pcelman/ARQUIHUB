export const validationsForm = (form, value = undefined, err = false) => {
  const { title, description, year, rooms, bathrooms, mts2, project_type } = form;
  let errors = {};

  if (value === "title" || err.title || value === undefined) {
    if (!title.trim()) errors.title = "'title' is required";
  }
  if (value === "description" || err.description || value === undefined) {
    if (!description.trim()) errors.description = "'description' is required";
  }
//   if (value === "project_type" || err.project_type || value === undefined) {
//     if (!project_type.trim())
//       errors.project_type = "'project type' is required";
//   }
  if (value === "mts2" || err.mts2 || value === undefined) {
    if (!mts2.trim()) errors.mts2 = "'mts2' is required";
  }
  if (value === "rooms" || err.rooms || value === undefined) {
    if (!rooms.trim()) errors.rooms = "'rooms' is required";
  }
  if (value === "year" || err.year || value === undefined) {
    if (!year.trim()) errors.year = "Select a date";
  }
  if (value === "bathrooms" || err.bathrooms || value === undefined) {
    if (!bathrooms.trim()) errors.bathrooms = "'bathrooms' is required";
  }

  return errors;
};
