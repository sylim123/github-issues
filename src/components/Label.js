import MyReact from '../core/MyReact.js';
import {getLabelTpl} from '../tpl.js';
import {labelStore} from '../stores/labelStore.js';
import {asyncPipe} from '../utils/pipe.js';
import {
  getDelayedLabelItemListOrNull,
  getLabelItemList,
} from '../api/label/index.js';
import LabelItem from './LabelItem.js';
import {getClassNameSetter} from '../utils/dom.js';


const SELECTOR = {
  labelCount: '.open-count',
  labelList: '.label-list',
  newLabel: '.new-label-button > a',
  newLabelForm: '#new-label-form',
  updateLabelsButton: '.refresh-labels'
};

class Label {
  constructor() {
    console.log('Label con');
    this.store = labelStore();
    this.fetchLabelItemList();
    this.getDelayedLabelItemListOrNull = getDelayedLabelItemListOrNull();
    this.newLabelComponent = null;
  }

  template = () => getLabelTpl();

  setNewLabelHiddenClass = getClassNameSetter(SELECTOR.newLabelForm, 'hidden');

  setLabelItemList = labelItems => {
    this.store.dispatch({
      values: {...this.store.getState().values, labelItems},
    });
  };

  fetchLabelItemList = asyncPipe(getLabelItemList, this.setLabelItemList);
  fetchDelayedLabelItemList = async () => {
    const resp = await this.getDelayedLabelItemListOrNull();
    if (resp !== null) {
      this.setLabelItemList(resp);
    }
  };

  renderLabelItems = () => {
    this.store.getState().values.labelItems.map(labelItem => {
      document.querySelector(SELECTOR.labelList).innerHTML += LabelItem({labelItem}).template();
    });
  };

  renderLabelCounts = () => {
    document.querySelector(SELECTOR.labelCount).textContent = `${this.store.getState().values.labelItems.length} Labels`;
  };

  renderLabelForm = async () => {
    const {newLabelIsOpen} = this.store.getState().values;
    this.setNewLabelHiddenClass(newLabelIsOpen);

    if (newLabelIsOpen) {
      if (this.newLabelComponent === null) {
        this.newLabelComponent = (await import('./NewLabel.js')).default;
      }
      this.newLabelComponent({setLabelItemList: this.setLabelItemList}).render();
    }
  };

  handleClickNewLabelButton = () => {
    const {newLabelIsOpen} = this.store.getState().values;
    this.store.dispatch({
      values: {...this.store.getState().values, newLabelIsOpen: !newLabelIsOpen},
    });
  };

  handleClickUpdateLabelsButton = () => {
    this.fetchDelayedLabelItemList();
  }

  templateDidMount = async () => {
    console.log('Label templateDidMount');
    this.renderLabelItems();
    this.renderLabelCounts();
    this.renderLabelForm();
  };

  setEvent = () => {
    document.querySelector(SELECTOR.newLabel).addEventListener('click', () => {
      this.handleClickNewLabelButton();
    });

    document.querySelector(SELECTOR.updateLabelsButton).addEventListener('click', () => {
      this.handleClickUpdateLabelsButton();
    });
  };
}

export default () => MyReact.createComponent({...new Label()});
