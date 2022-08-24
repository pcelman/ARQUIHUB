
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


//back

const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')




import {
  orderByName,
  
} from "../src/actions/index";




describe ("Should order alphabetically", ()=> {

  it("should sort in ascending order", ()=> {
    expect(orderByName("asc")).toEqual({
      type: "ORDER_BY_NAME",
      payload: "asc",
    })
  })
  it("should sort in descending order", ()=> {
    expect(orderByName("desc")).toEqual({
      type: "ORDER_BY_NAME",
      payload: "desc",
    })
  })
})

