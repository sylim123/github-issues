import createStore from '../core/Store.js';


const initState = {
  values: {
    labelItems: [],
    labelNameValue: '',
    labelDescriptionValue: '',
    labelColorValue: '',
    newLabelIsOpen: false,
  },
};

export const labelStore = () => createStore(
  (state = initState, action = {}) => ({...state, ...action})
);
