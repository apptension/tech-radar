export const assertUnreachable = (value: never, message: string): never => {
  throw new Error(message);
};
