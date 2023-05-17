import { v4 } from "uuid";

export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCB = (arg: string) => void;

export const toUpperCase = (arg: string): string => {
  return arg.toUpperCase();
};

export const toLowerCaseWithId = (arg: string): string => {
  return arg.toLowerCase() + v4();
};

export const calculateComplexity = (stringInfo: StringInfo): number => {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
};

export const toUpperCaseWithCB = (
  arg: string,
  callback: LoggerServiceCB
): string | void => {
  if (!arg) {
    callback("Invalid Argument");
    return;
  }
  callback(`Called Function ${arg}`);
  return arg.toUpperCase();
};

export class OtherStringUtils {
  private callExternalService() {
    console.log("calling external service");
  }

  public toUpperCase(arg: string) {
    return arg.toLocaleUpperCase();
  }
  public logString(arg: string) {
    console.log(arg);
  }
}
