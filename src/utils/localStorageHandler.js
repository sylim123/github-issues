const localStorageHandler = (defaultTTL => {
  const getWrappedValue = (value, ttl) => {
    const item = {
      value: value,
      expiry: new Date().getTime() + ttl,
    };
    return JSON.stringify(item);
  };

  const getUnWrappedValue = key => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  const setValue = (key, value, ttl) => {
    const _ttl = ttl || defaultTTL
    localStorage.setItem(key, getWrappedValue(value, _ttl));
  };
  const getValue = k => getUnWrappedValue(k);

  const getValueOrElse = (key, defaultValue) => (
    getUnWrappedValue(key) ?? defaultValue
  );

  const removeKey = key => localStorage.removeItem(key);

  return {setValue, getValue, getValueOrElse, removeKey}
})(3600 * 24 * 1000);

// const _localStorageHandler = localStorageHandler();
export default localStorageHandler;
