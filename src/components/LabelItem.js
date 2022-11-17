import MyReact from '../core/MyReact.js';
import {getLabelItemTpl} from '../tpl.js';


class LabelItem {
  constructor(props) {
    this.labelItem = props.labelItem;
  }

  template = () => getLabelItemTpl(this.labelItem);
}

export default props => MyReact.createComponent({...new LabelItem(props)});
