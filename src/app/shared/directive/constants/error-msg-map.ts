export enum ErrorMsgKeys {
  REQUIRED = 'required',
  MIN_LENGTH = 'minlength',
  EMAIL = 'email',
  PATTERN = 'pattern',
  NOT_EQUIVALENT = 'notEquivalent',
  NOT_UNIQUE = 'notUnique',
}

type ErrorMsgMap = {
  [key in ErrorMsgKeys]: (...args: any[]) => string;
};

export const ERROR_MSG_MAP: ErrorMsgMap = {
  required: (): string => `This field is required`,
  minlength: ({
    requiredLength,
    actualLength,
  }: {
    requiredLength: number;
    actualLength: number;
  }): string => `Expect ${requiredLength} but got ${actualLength}`,
  email: (): string => 'Invalid email',
  pattern: (): string => 'Field should contains at least one letter and one number',
  notEquivalent: ({ compareField }: { compareField: string }): string =>
    `Field should be equivalent to the '${compareField}' field`,
  notUnique: ({ field }: { field: string }): string =>
    `${field} already exist. ${field} must be unique`,
};
