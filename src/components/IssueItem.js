import MyReact from '../core/MyReact.js';
import {getIssueItemTpl} from '../tpl.js';


const IssueItem = (props) => {
  const {issueItem} = props;

  const template = () => {
    console.log('IssueItem template', issueItem);
    return getIssueItemTpl(issueItem)
  }

  return MyReact.createComponent({
    template,
  });
}

export default IssueItem;
