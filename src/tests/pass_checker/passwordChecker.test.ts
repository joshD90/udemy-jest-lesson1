import { PasswordChecker } from "../../app/pass_checker/passwordChecker";

describe("test our password checker", () => {
  let sut: PasswordChecker;
  beforeEach(() => (sut = new PasswordChecker()));

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual).toBe(false);
  });
  it("Password should return true if it has 8 or more char", () => {
    const actual = sut.checkPassword("12345678Ab");
    expect(actual).toBe(true);
  });
  it("Password is invalid if it has no uppercase char", () => {
    const actual = sut.checkPassword("1234abcd");
    expect(actual).toBe(false);
  });
  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("1234abcD");
    expect(actual).toBe(true);
  });
  it("Password is invalid if no lowercase letters", () => {
    const actual = sut.checkPassword("1234ABCD");
    expect(actual).toBe(false);
  });
  it("Password is valid if it has lowercase letters", () => {
    const actual = sut.checkPassword("1234ABcD");
    expect(actual).toBe(true);
  });
});
