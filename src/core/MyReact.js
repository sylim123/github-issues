import Component from './Component.js';


const MyReact = (() => {
  const options = {
    hooks: [],
    hookIdx: 0,
    renderCount: 0,
    container: null,
    root: null,
  }

  const useEffect = (callback, depArr) => {
    const {
      hooks,
      hookIdx,
    } = options;

    const oldDeps = hooks[hookIdx];
    let isChanged = true;
    if (oldDeps) {
      isChanged = depArr.some(
        (dep, idx) => !Object.is(dep, oldDeps[idx])
      );
    }

    if (isChanged) {
      callback();
    }
    options.hooks[hookIdx] = depArr;
    options.hookIdx += 1;
  }

  const useState = (initState) => {
    const {
      hooks,
      hookIdx,
    } = options;

    const state = hooks[hookIdx] || initState;
    const setState = (newState) => {
      hooks[hookIdx] = newState;
      _render();
    }
    options.hookIdx += 1;
    return [state, setState];
  }

  const _render = () => {
    const {container, root} = options;
    if (!container || !root) {
      return;
    }
    if (options.hookIdx > 100) {
      console.error('rendering called too much!')
      return;
    }

    const {template, templateDidMount, setEvent} = root();
    container.innerHTML = template();
    templateDidMount();
    setEvent();

    options.hookIdx = 0;
    options.renderCount += 1;
    console.log('here _render()', options);
    console.log('==============================');
  };

  const render = (root, container) => {
    options.container = container;
    options.root = root;
    _render();
  }

  const createComponent = ({template, templateDidMount, setEvent}) => (
    Component({template, templateDidMount, setEvent})
  );

  return {useEffect, useState, render, createComponent};
})();

export default MyReact;
