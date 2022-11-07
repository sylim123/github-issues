import Issue from './components/Issue.js';
import MyReact from './core/MyReact.js';


const App = () => {
  const issueComponent = Issue();

  const template = () => {
    console.log('App template');
    return `
      <div>
        ${issueComponent.template()}
      </div>
    `
  };

  const templateDidMount = () => {
    console.log('App templateDidMount');
    issueComponent.templateDidMount();
  };

  const setEvent = () => {
    console.log('App setEvent');
    issueComponent.setEvent();
  };

  return MyReact.createComponent({
    template,
    templateDidMount,
    setEvent,
  });
}

export default App;
