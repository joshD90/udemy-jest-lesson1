import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCB,
} from "../../app/doubles/other_utils";
import { toUpperCase } from "../../app/utils";
//STUBS
describe.skip("Other Utils Test Suite", () => {
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
  describe("tracking callbacks with jest mocks", () => {
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

  //Spies - do not change the original functionality in the test.
  //not directly injected into the SUT
  //typically used for testing methods within a class rather than functions

  describe("OtherStringUtils tests with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("asa");

      expect(toUpperCaseSpy).toBeCalledWith("asa");
    });
    //we can use a spy to also check in on what other modules are doing
    //in this we can check that console.log is being called
    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("abc");

      expect(consoleLogSpy).toBeCalledWith("abc");
    });

    //we can use a spy to replace the implementation of a method aka if it calls an external service and we dont want our test to do that

    test("use a spy to replace the implementation of a method", () => {
      //we also can test private methods however this is not best practice and shows that there is a codesmell - little bit of a hack
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation");
      });
      (sut as any).callExternalService();
    });
  });
});
