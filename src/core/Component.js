import {observe} from './observer.js';


const Component = props => {
  const {template, templateDidMount, setEvent, store} = props;

  const render = container => {
    const _render = () => {
      if (container && template) {
        container.innerHTML = template();
      }
      if (templateDidMount) {
        templateDidMount();
      }
      if (setEvent) {
        setEvent();
      }
    };

    if (store) {
      observe(() => {
        _render();
      });
    } else {
      _render();
    }
  };

  return {render, ...props};
};

export default Component;
