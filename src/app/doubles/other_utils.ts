export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCB = (arg: string) => void;

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
