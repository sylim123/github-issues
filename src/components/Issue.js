import IssueItem from './IssueItem.js';
import MyReact from '../core/MyReact.js';
import {getIssueItemList} from '../api/index.js';
import {getIssueTpl} from '../tpl.js';
import {asyncPipe} from '../utils/pipe.js';


const ISSUE_STATUS = {
  open: 'open',
  close: 'close',
}

const Issue = () => {
  const [issueItemList, setIssueItemList] = MyReact.useState([]);
  const [issueStatus, setIssueStatus] = MyReact.useState(ISSUE_STATUS.open);

  const issueItemComponents = issueItemList
    .filter(issue => issue.status === issueStatus)
    .map(issueItem => IssueItem({issueItem}));

  const fetchIssueList = asyncPipe(getIssueItemList, setIssueItemList);

  MyReact.useEffect(() => {
    fetchIssueList();
  }, []);

  const handleClickIssueOpens = () => {
    setIssueStatus(ISSUE_STATUS.open);
  };

  const handleClickIssueClosed = () => {
    setIssueStatus(ISSUE_STATUS.close);
  };

  const getIssueStateElem = status => document.querySelector(`.${status}-count`);

  const getIssueStatusCount = status => (
    issueItemList.filter(issue => issue.status === status).length
  );

  const getIssueStatusText = (count, status) => {
    switch (status) {
      case ISSUE_STATUS.open:
        return `${count} Opens`;
      case ISSUE_STATUS.close:
        return `${count} Closed`;
    }
  };

  const renderIssueCounts = status => {
    getIssueStateElem(status).textContent = getIssueStatusText(
      getIssueStatusCount(status),
      status,
    );
  };

  const renderIssueStatusTabFontBold = status => {
    if (status !== issueStatus) {
      return;
    }

    const fontBoldClassName = 'font-bold';
    switch (status) {
      case ISSUE_STATUS.open:
        getIssueStateElem(ISSUE_STATUS.close).classList.remove(fontBoldClassName);
        getIssueStateElem(ISSUE_STATUS.open).classList.add(fontBoldClassName);
        return;
      case ISSUE_STATUS.close:
        getIssueStateElem(ISSUE_STATUS.open).classList.remove(fontBoldClassName);
        getIssueStateElem(ISSUE_STATUS.close).classList.add(fontBoldClassName);
        return;
    }
  };

  const renderIssueStatusTab = () => {
    Object.values(ISSUE_STATUS).map(status => {
      renderIssueStatusTabFontBold(status);
      renderIssueCounts(status);
    });
  };

  const renderIssueItems = () => {
    issueItemComponents.map(issueItemComponent => {
      document.querySelector('.issue-list > ul').innerHTML += issueItemComponent.template();
    });
  };

  const template = () => {
    return getIssueTpl();
  };

  const templateDidMount = () => {
    renderIssueStatusTab();
    renderIssueItems();
  };

  const setEvent = () => {
    getIssueStateElem(ISSUE_STATUS.open)
      .addEventListener('click', handleClickIssueOpens);

    getIssueStateElem(ISSUE_STATUS.close)
      .addEventListener('click', handleClickIssueClosed);
  };

  return MyReact.createComponent({
    template,
    templateDidMount,
    setEvent,
  });
}

export default Issue;
