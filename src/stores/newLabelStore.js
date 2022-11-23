import createStore from '../core/Store.js';


const initState = {
  values: {
    labelNameValue: '',
    labelDescriptionValue: '',
    labelColorValue: '',
  },
};

export const newLabelStore = initialValues => {
  if (initialValues !== undefined) {
    Object.assign(initState.values, initialValues);
  }
  return createStore(
    (state = initState, action = {}) => ({...state, ...action})
  );
}
