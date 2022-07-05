import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Todos from "../components/Todos/Todos";
import Todo from "../components/Todo/Todo";

configure({ adapter: new Adapter() });

describe("<Todos />", () => {
  let wrapper;
  let store;
  const state = [
    {
      title: "compras",
      description: "ir al super a hacer compras",
      place: "walmart",
      date: "mañana",
      id: 1,
      status: "Todo",
    },
    {
      title: "leer",
      description: "leer Lord of the Flies",
      place: "living room",
      date: "hoy",
      id: 2,
      status: "Todo",
    },
  ];
  const mockStore = configureStore();
  store = mockStore(state);
  const status = "Todo";
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Todos status={status} />
        </MemoryRouter>
      </Provider>
    );
  });

  it("deberia mapear la cantidad de todos que haya en el store y renderizar un <Todo /> por cada uno", () => {
    expect(wrapper.find(Todo)).toHaveLength(2);
  });

  it("deberia pasar como props al componente Todo el `title` del todo", () => {
    expect(wrapper.find(Todo).at(0).prop("title")).toBe("compras");
  });

  it('deberia renderizar un "span", que muestre la prop "status" que recibe el componente <Todos />', () => {
    // Este span es el titulo de nuestro contenedor de Todos
    expect(wrapper.find("span")).toHaveLength(1);
    expect(wrapper.contains(<span>{status}</span>)).toEqual(true);
  });

  it("deberia renderizar un componente <Link>, por cada <Todo> que exista", () => {
    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('El <Link> deberia redirigir a "/edit/:id", y que el "id" matchee el id de cada Todo', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/edit/2");
  });

  it("Cada <Link> deberia contener un componente Todo.", () => {
    // Dentro de cada Link deberia renderizarse un componente Todo
    const link = wrapper.find(Link).at(1);
    expect(link.find(Todo)).toHaveLength(1);
  });

  it("deberia mapear la cantidad de todos que haya en el store filtrando por status y renderizar un <Todo /> por cada uno. Dependiendo el status que llegue por props.", () => {
    state[0].status = "Done";
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Todos status="Todo" />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Todo)).toHaveLength(1);
  });
});
