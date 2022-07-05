import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Nav from "../components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it("Deberia renderizar Dos <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(2);
  });
  it('El primer Link debe tener el texto "TODOS" y cambiar la ruta hacia "/".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(Link).at(0).prop("to")).toEqual("/");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(0).text()).toEqual("TODOS");
  });
  it('El segundo Link debe tener el texto "Add Todo" y cambiar la ruta hacia "/add"', () => {
    expect(wrapper.find(Link).at(1).prop("to")).toEqual("/add");
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(1).text()).toEqual("Add Todo");
  });
});
