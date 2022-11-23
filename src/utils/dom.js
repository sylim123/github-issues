export const getClassNameSetter = (selector, className) => state => {
  if (state) {
    document.querySelector(selector).classList.remove(className);
  } else {
    document.querySelector(selector).classList.add(className);
  }
};
