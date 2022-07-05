

const initialState = [];

//En nuestro estado guardaremos objetos con `todos`. Cada todo tendra: title, description, place, date, id y un status;
const todos = (state = initialState, action) => {
  switch(action.type) {
    // Aca va tu codigo;
    case "AddTodo":
      state = state.concat(action.payload)
      return state
    case "RemoveTodo":
      console.log(state, action)
      return state.filter(todo => todo.id !== action.payload)
    case "ToInProgress":
      console.log(state, action)
      state.map(todo => todo.id === action.payload ? todo.status = "InProgress" : null)
      return state
    case "ToDone":
      console.log(state, action)
      state.map(todo => todo.id === action.payload ? todo.status = "Done" : null)
      return state
    default:
      return state
  }
}

export default todos;
