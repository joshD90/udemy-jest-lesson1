import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/pass_checker/passwordChecker";

describe("test our password checker", () => {
  let sut: PasswordChecker;
  beforeEach(() => (sut = new PasswordChecker()));

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });
  it("Password should return true if it has 8 or more char", () => {
    const actual = sut.checkPassword("12345678");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });
  it("Password is invalid if it has no uppercase char", () => {
    const actual = sut.checkPassword("abcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });
  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("abcD");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });
  it("Password is invalid if no lowercase letters", () => {
    const actual = sut.checkPassword("ABCD");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });
  it("Password is valid if it has lowercase letters", () => {
    const actual = sut.checkPassword("ABcD");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });
  it("Complex password is valid", () => {
    const actual = sut.checkPassword("ABCDefgh");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });
  it("Admin Password with no Password is Invalid", () => {
    const actual = sut.checkAdminPassword("abcdEFGH");
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false);
  });
  it("Admin password with number is valid", () => {
    const actual = sut.checkAdminPassword("Abcedfgh1");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
