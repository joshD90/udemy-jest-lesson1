import { StringUtils, getStringInfo, toUpperCase } from "../app/utils";

describe("utils test suite", () => {
  //intermediate concepts
  describe.only("StringUtils tests", () => {
    let sut: StringUtils;
    let actual: string;
    //setup
    beforeEach(() => {
      console.log("setup");
      sut = new StringUtils();
    });
    //teardown
    afterEach(() => {
      console.log("Teardown");
    });
    it("should return correct uppercase", () => {
      console.log("actual test");
      actual = sut.toUpperCase("abc");
      expect(actual).toBe("ABC");
    });

    //checking for errors with jest - there are 3 ways to do this
    //functionally
    it("Should throw an error with invalid argument - function", () => {
      //create a function that will run the error giving code
      function expectFunction() {
        const actual = sut.toUpperCase("");
      }
      expect(expectFunction).toThrow();
      expect(expectFunction).toThrowError("Invalid argument!");
    });
    //compact arrow function
    it("Should throw an error with invalid argument - arrow function", () => {
      expect(() => sut.toUpperCase("")).toThrow();
      expect(() => sut.toUpperCase("")).toThrowError("Invalid argument!");
    });
    //use try catch block
    it.only("Should throw an error with invalid argument - try catch", (done) => {
      try {
        sut.toUpperCase("");
        done(
          "StringUtils.toUpperCase should throw an error when passed an invalid string"
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  it("should return uppercase of a valid string", () => {
    //arrange
    const sut = toUpperCase;
    const expected = "ABC";

    //act
    const actual = sut("abc");

    //assert
    expect(actual).toBe(expected);
  });

  describe("getStringInfo for arg My-String should", () => {
    //each test should be fully independent so reuse the actual

    test("return right length", () => {
      //act
      const actual = getStringInfo("My-String");
      //assert
      expect(actual.characters).toHaveLength(9);
    });
    test("return right lower case", () => {
      //act
      const actual = getStringInfo("My-String");
      //assert
      expect(actual.lowerCase).toBe("my-string");
    });
    test("return right upper case", () => {
      //act
      const actual = getStringInfo("My-String");
      //assert
      expect(actual.upperCase).toBe("MY-STRING");
    });
    test("return right characters", () => {
      //act
      const actual = getStringInfo("My-String");
      //assert
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);

      expect(actual.characters).toContain<string>("M");
      //we can check arrays that are not in any particular order this way
      expect(actual.characters).toEqual(
        expect.arrayContaining(["t", "r", "i", "n", "g", "M", "y", "-", "S"])
      );
    });
    test("return defined and correct extra info", () => {
      //act
      const actual = getStringInfo("My-String");
      //assert
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
      expect(actual.extraInfo).toBeInstanceOf(Object);
    });
  });
});

//we can also test a range of parameters with the each should there be a lot of use cases
describe.only("toUpperCase examples", () => {
  it.each([
    { input: "abc", expected: "ABC" },
    { input: "My-String", expected: "MY-STRING" },
    { input: "def", expected: "DEF" },
  ])("$input toUpperCase should be $expected", ({ input, expected }) => {
    const actual = toUpperCase(input);
    expect(actual).toBe(expected);
  });
});
