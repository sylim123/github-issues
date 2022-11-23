import createStore from '../core/Store.js';


const initState = {
  values: {
    labelItems: [],
    newLabelIsOpen: false,
  },
};

export const labelStore = initialValues => {
  if (initialValues !== undefined) {
    Object.assign(initState.values, initialValues);
  }
  return createStore(
    (state = initState, action = {}) => ({...state, ...action})
  );
}
