import Issue from './components/Issue.js';
import MyReact from './core/MyReact.js';


const App = () => {
  const issueComponent = Issue();

  const template = () => {
    return `
      <div>
        ${issueComponent.template()}
      </div>
    `
  };

  const templateDidMount = () => {
    issueComponent.templateDidMount();
  };

  const setEvent = () => {
    issueComponent.setEvent();
  };

  return MyReact.createComponent({
    template,
    templateDidMount,
    setEvent,
  });
}

export default App;
