export const pipe = (...functions) =>
  args => functions.reduce((arg, nextFn) => nextFn(arg), args);

export const asyncPipe = (...functions) =>
  args => functions.reduce((arg, nextFn) => arg.then(nextFn), Promise.resolve(args));
