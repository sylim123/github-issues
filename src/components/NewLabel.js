import MyReact from '../core/MyReact.js';
import localStorageHandler from '../utils/localStorageHandler.js';
import {getClassNameSetter} from '../utils/dom.js';
import {addLabelItemAndGetLabelItemOrNull} from '../api/label/index.js';
import {getRandomColorCode} from '../utils/color.js';
import {newLabelStore} from '../stores/newLabelStore.js';


const SELECTOR = {
  labelCreateButton: '#label-create-button',
  labelPreview: '#label-preview',
  labelNameValue: '#label-name-input',
  labelDescriptionValue: '#label-description-input',
  labelColorValue: '#label-color-value',
  newLabelColor: '#new-label-color',
  newLabelForm: '#new-label-form',
};

const LABEL_INPUT_SELECTOR_KEYS = [
  'labelNameValue',
  'labelDescriptionValue',
  'labelColorValue',
];

class NewLabel {
  constructor(props) {
    console.log('NewLabel constructor');
    this.store = newLabelStore();
    this.setLabelItemList = props.setLabelItemList;
    this.setCachedValues();
  }

  getCachedLabelInputValues = () => (
    LABEL_INPUT_SELECTOR_KEYS.reduce((acc, key) => (
      {...acc, [key]: localStorageHandler.getValueOrElse(key, '')}
    ), {})
  )

  setLabelInputValue = (selectorKey, value) => {
    document.querySelector(SELECTOR[selectorKey]).value = value;
  }

  setLabelBackgroundColor = colorCode => {
    document.querySelector(SELECTOR.newLabelColor).style.backgroundColor = colorCode;
    document.querySelector(SELECTOR.labelPreview).style.backgroundColor = colorCode;
  };

  setCreateLabelOpacityClass = getClassNameSetter(SELECTOR.labelCreateButton, 'opacity-50');

  setCreateLabelButtonDisabled = () => {
    const {
      labelNameValue,
      labelDescriptionValue,
      labelColorValue,
    } = this.store.getState().values;
    const disabled = (
      labelNameValue === ''
      || labelDescriptionValue === ''
      || labelColorValue === ''
    );
    document.querySelector(SELECTOR.labelCreateButton).disabled = disabled;
    this.setCreateLabelOpacityClass(!disabled);
  };

  setCachedValues = () => {
    this.store.dispatch({
      values: {
        ...this.store.getState().values,
        ...this.getCachedLabelInputValues(),
      }
    });
  };

  handleChangeLabelInputValue = (selectorKey, value) => {
    this.setLabelInputValue(selectorKey, value);
    const aa = {
    ...this.store.getState().values,
        [selectorKey]: value,
    };
    this.store.dispatch({values: aa});
    localStorageHandler.setValue(selectorKey, value);
  };

  handleClickNewLabelColorButton = () => {
    this.handleChangeLabelInputValue('labelColorValue', getRandomColorCode());
  };

  handleSubmitNewLabelForm = async event => {
    event.preventDefault();
    const {values} = this.store.getState();
    const {
      labelNameValue,
      labelDescriptionValue,
      labelColorValue,
    } = values;

    const newItem = {
      name: labelNameValue,
      description: labelDescriptionValue,
      color: labelColorValue.replace('#', ''),
    };
    const newLabelItems = await addLabelItemAndGetLabelItemOrNull(newItem);
    if (newLabelItems !== null) {
      this.setLabelItemList(newLabelItems);
      LABEL_INPUT_SELECTOR_KEYS.map(key => this.handleChangeLabelInputValue(key, ''));
    }
  };

  renderNewLabelForm = () => {
    const {values} = this.store.getState();
    LABEL_INPUT_SELECTOR_KEYS.map(key => {
      this.setLabelInputValue(key, values[key]);
    });
    this.setLabelBackgroundColor(values['labelColorValue']);
    this.setCreateLabelButtonDisabled();
  };

  template = () => '';

  templateDidMount = () => {
    this.renderNewLabelForm();
  }

  setEvent = () => {
    document.querySelector(SELECTOR.newLabelColor).addEventListener('click', () => {
      this.handleClickNewLabelColorButton();
    });

    document.querySelector(SELECTOR.labelNameValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelNameValue', value);
    });
    document.querySelector(SELECTOR.labelDescriptionValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelDescriptionValue', value);
    });
    document.querySelector(SELECTOR.labelColorValue).addEventListener('change', ({target: {value}}) => {
      this.handleChangeLabelInputValue('labelColorValue', value);
    });

    document.querySelector(SELECTOR.newLabelForm).addEventListener('submit', e => {
      this.handleSubmitNewLabelForm(e);
    });
  };
}

export default props => MyReact.createComponent({...new NewLabel(props)});
