import { getStringInfo, toUpperCase } from "../app/utils";

describe("utils test suite", () => {
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