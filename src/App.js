import Issue from './components/Issue.js';
import Label from './components/Label.js';
import MyReact from './core/MyReact.js';
import Router from './core/Router.js';
import {getRoute} from './core/Router.js';


const App = () => {
  const router = Router([
    getRoute({path: '/', component: null}),
    getRoute({path: '/issues', component: Issue}),
    getRoute({path: '/labels', component: Label}),
  ]);

  const render = container => router.route(container);

  return MyReact.createComponent({render});
}

export default App;
