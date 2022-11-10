export const pipe = (...functions) =>
  (...args) => functions.reduce((arg, nextFn) => nextFn(arg), args);

export const asyncPipe = (...functions) =>
  (...args) => functions.reduce((promise, nextFn) => promise.then(nextFn), Promise.resolve(args));
