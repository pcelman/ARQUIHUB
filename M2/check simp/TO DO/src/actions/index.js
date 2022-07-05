// Podes usar esta variable para generar un ID por cada Todo.
let todoId = 1

export const addTodo = function (Todo) {
    todoId++
    return {
        type: "AddTodo",
        payload: {
            ...Todo,
            status: 'Todo',
            id: todoId-1,
        }
    }
};

export const removeTodo = function (index) {
    return {
        type: "RemoveTodo",
        payload: index,
    }
};

export const toInProgress = function (index) {
    return {
        type: "ToInProgress",
        payload: index,
    }
};

export const toDone = function (index) {
    return {
        type: "ToDone",
        payload: index
    }
};