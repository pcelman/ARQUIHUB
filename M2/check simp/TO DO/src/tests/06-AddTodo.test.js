import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { addTodo } from "../actions";
import configureStore from "redux-mock-store";
import AddTodoDefault, { AddTodo } from "../components/AddTodo/AddTodo.js";

configure({ adapter: new Adapter() });

describe("<AddTodo />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddTodo />);
    });
    it("Renderiza un <form>", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Title"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(0).text()).toEqual("Title");
    });

    it('Renderiza un input con la propiedad "name" igual a "title"', () => {
      expect(wrapper.find('input[name="title"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Description"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(1).text()).toEqual("Description");
    });

    it('Renderiza una textarea con la propiedad "name" igual a "description"', () => {
      expect(wrapper.find('textarea[name="description"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Place"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(2).text()).toEqual("Place");
    });

    it('Renderiza un input con la propiedad "name" igual a "place"', () => {
      expect(wrapper.find('input[name="place"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Date"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(3).text()).toEqual("Date");
    });

    it('Renderiza un input con la propiedad "name" igual a "date"', () => {
      expect(wrapper.find('input[name="date"]')).toHaveLength(1);
    });

    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
  });

  describe("Manejo de inputs con estado", () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<AddTodo />);
    });

    describe("Title input", () => {
      it("El form deberia cambiar de estado cuando escriban en el input de title", () => {
        // deberías tener un único estado, no uno por cada input
        wrapper
          .find('input[name="title"]')
          .simulate("change", {
            target: { name: "title", value: "My new value" },
          });
        expect(useState).toHaveBeenCalledWith({
          title: "My new value",
          description: "",
          place: "",
          date: "",
        });
      });
    });

    describe("Description input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "description"', () => {
        // debe respetar el estado que ya tenía antes
        wrapper
          .find('textarea[name="description"]')
          .simulate("change", {
            target: { name: "description", value: "salir a escuchar musica" },
          });
        expect(useState).toHaveBeenCalledWith({
          title: "",
          description: "salir a escuchar musica",
          place: "",
          date: "",
        });
      });
    });

    describe("Place input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "place"', () => {
        wrapper
          .find('input[name="place"]')
          .simulate("change", { target: { name: "place", value: "London" } });
        expect(useState).toHaveBeenCalledWith({
          title: "",
          description: "",
          place: "London",
          date: "",
        });
      });
    });

    describe("Date input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "date"', () => {
        wrapper
          .find('input[name="date"]')
          .simulate("change", { target: { name: "date", value: "mañana" } });
        expect(useState).toHaveBeenCalledWith({
          title: "",
          description: "",
          place: "",
          date: "mañana",
        });
      });
    });
  });

  describe("Dispatch to store", () => {
    var wrapper;
    var store;
    beforeEach(() => {
      const mockStore = configureStore();
      store = mockStore([], addTodo);
      store.clearActions();
      wrapper = mount(<AddTodoDefault store={store} />);
    });

    it('deberia hacer un dispatch al store de la action "AddTodo" con los datos del state cuando se hace un Submit', () => {
      wrapper = mount(<AddTodoDefault store={store} />);
      wrapper
        .find('[type="submit"]')
        .simulate("submit", { preventDefault() {} });
      const expectedAction = [
        {
          payload: {
            title: "",
            description: "",
            place: "",
            date: "",
            status: "Todo",
            id: 1,
          },
          type: "AddTodo",
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
    });

    it("deberia llamar al evento `preventDefault()` para evitar que se refresque la pagina al hacer un submit", () => {
      wrapper = mount(<AddTodoDefault store={store} />);
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      wrapper.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
