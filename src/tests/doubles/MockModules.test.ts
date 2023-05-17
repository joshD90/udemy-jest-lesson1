//mocking entire modules
//this imports the module and makes a mock of every function that is within it
//the second argument of the mock function states all methods or functions that we will mock within the module not necessarily every one

//when we do a jest.mock on this module, when we import * as OtherUtils later on, jest knows that this is referring to our mocked version and only gets the mocked version... spreading require actual means that if we dont want to mock all our functions we dont have to
jest.mock("../../app/doubles/other_utils", () => ({
  ...jest.requireActual("../../app/doubles/other_utils"),
  calculateComplexity: () => 10,
}));

jest.mock("uuid", () => ({
  v4: () => 123,
}));

import * as OtherUtils from "../../app/doubles/other_utils";

describe("testing modules", () => {
  test("calculate complexity", () => {
    const result = OtherUtils.calculateComplexity({} as any);
    console.log(result);
    expect(result).toBe(10);
  });
  test("toUpperCase should return uppercase string", () => {
    const actual = OtherUtils.toUpperCase("abc");
    expect(actual).toBe("ABC");
  });
  //if we are working with a library where we don't know what it will be returning we can mock it like we did at the top to give it a predictable outcome.  In this case we have mocked V4 of uuid to always return 123
  test("check that UUID library is functioning aka lowerCase with Id", () => {
    const actual = OtherUtils.toLowerCaseWithId("ABC");
    expect(actual).toBe("abc123");
  });
});
