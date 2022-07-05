import reducer from "../reducer/index";
import { addTodo, removeTodo, toInProgress, toDone } from "../actions";

describe("reducer", () => {
  it("Deberia retornar el estado inicial", () => {
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('deberia agregar un TODO cuando action type es "AddTodo"', () => {
    const payload = {
      title: "ejercicio",
      description: "ir al parque y ejercitar",
      place: "Palermo",
      date: "mañana",
    };
    // fijarse bien las propiedades que tiene que recibir.
    expect(reducer([], addTodo(payload))).toEqual([
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Todo",
      },
    ]);
  });

  it("deberia agregar otro TODO sin mutar el state previo", () => {
    const payload = {
      title: "escuchar musica",
      description: "The beatles",
      place: "casa",
      date: "por la noche",
    };
    const someState = [
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Todo",
      },
    ];
    expect(reducer(someState, addTodo(payload))).toEqual([
      ...someState,
      {
        title: "escuchar musica",
        description: "The beatles",
        place: "casa",
        date: "por la noche",
        id: 2,
        status: "Todo",
      },
    ]);
  });

  it('deberia sacar un TODO cuando action type es "RemoveTodo"', () => {
    const payload = 1;
    const someState = [
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Todo",
      },
    ];
    expect(reducer(someState, removeTodo(payload))).toEqual([]);
  });

  it('deberia modificar la propiedad "status" de un TODO segun su id a "InProgress" cuando action type es "ToInProgress"', () => {
    const payload = 1;
    const someState = [
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Todo",
      },
    ];
    expect(reducer(someState, toInProgress(payload))).toEqual([
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "InProgress",
      },
    ]);
  });

  it('deberia modificar la propiedad "status" de un TODO segun su id a "Done" cuando action type es "ToDone"', () => {
    const payload = 1;
    const someState = [
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Todo",
      },
    ];
    expect(reducer(someState, toDone(payload))).toEqual([
      {
        title: "ejercicio",
        description: "ir al parque y ejercitar",
        place: "Palermo",
        date: "mañana",
        id: 1,
        status: "Done",
      },
    ]);
  });
});
