import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Todo from "../components/Todo/Todo";

configure({ adapter: new Adapter() });

describe("<Todo />", () => {
  let wrapper;
  let title;
  beforeEach(() => {
    title = "escuchar musica";
    wrapper = mount(<Todo title={title} />);
  });

  it('deberia renderizar un "div" que contenga el "title" que recibe por props', () => {
    expect(wrapper.contains(<div>{title}</div>)).toEqual(true);
  });
});
