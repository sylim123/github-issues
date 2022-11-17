let currentObserver = null;

export const observe = func => {
  currentObserver = func;
  func();
  currentObserver = null;
};

export const observable = obj => {
  const observerMap = Object.keys(obj).reduce((map, key) => {
    map[key] = new Set();
    return map;
  }, {});

  return new Proxy(obj, {
    get: (target, name) => {
      if (currentObserver) {
        observerMap[name].add(currentObserver);
      }
      return target[name];
    },
    set: (target, name, value) => {
      if (target[name] === value) {
        return true;
      }
      if (JSON.stringify(target[name]) === JSON.stringify(value)) {
        return true;
      }
      target[name] = value;
      observerMap[name].forEach(func => func());
      return true;
    }
  });
};
