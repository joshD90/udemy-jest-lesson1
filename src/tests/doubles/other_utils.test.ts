import {
  calculateComplexity,
  toUpperCaseWithCB,
} from "../../app/doubles/other_utils";
//STUBS
describe("Other Utils Test Suite", () => {
  it("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: { field1: "someInfo", field2: "someOtherInfo" },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
  //FAKES
  it("To Uppercase, calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCB("", () => {});
    expect(actual).toBe("");
  });
  it("To Uppercase calls callback for Valid Argument", () => {
    const actual = toUpperCaseWithCB("abc", () => {});
    expect(actual).toBe("ABC");
  });
});
