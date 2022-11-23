import App from './App.js';
import MyReact from './core/MyReact.js';
import {worker} from './mocks/browser';


worker.start();
MyReact.render(
  App(),
  document.getElementById('app'),
);
