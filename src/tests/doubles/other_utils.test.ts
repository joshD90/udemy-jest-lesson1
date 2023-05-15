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
  //FAKES - sometimes are not good enough.  Could use Mock instead
  it("To Uppercase, calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCB("", () => {});
    expect(actual).toBeUndefined();
  });
  it("To Uppercase calls callback for Valid Argument", () => {
    const actual = toUpperCaseWithCB("abc", () => {});
    expect(actual).toBe("ABC");
  });

  //our own self made mocks - Jest has a better way to do this out of the box (do not use this method)
  describe("Tracking Callback", () => {
    let cbArgs: string[] = [];
    let timesCalled: number = 0;

    const callbackMock = (arg: string) => {
      cbArgs.push(arg);
      timesCalled++;
    };
    //clear the tracking fields
    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("toUppercaseWithCB calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCB("", callbackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid Argument");
      expect(timesCalled).toBe(1);
    });

    it("toUppercaseWithCB calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCB("abc", callbackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).not.toContain("Invalid Argument");
      expect(cbArgs).toContain("Called Function abc");
      expect(timesCalled).toBe(1);
    });
  });

  //use the out of the box tracking functionality using jest Mocks
  describe.only("tracking callbacks with jest mocks", () => {
    const callbackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("toUppercaseWithCB calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCB("", callbackMock);
      expect(actual).toBeUndefined();
      expect(callbackMock).toBeCalledWith("Invalid Argument");
      expect(callbackMock).toBeCalledTimes(1);
    });

    it("toUppercaseWithCB calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCB("abc", callbackMock);
      expect(actual).toBe("ABC");
      expect(callbackMock).toBeCalledWith("Called Function abc");
      expect(callbackMock).toBeCalledTimes(1);
    });
  });
});
