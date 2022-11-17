import Component from './Component.js';


const MyReact = (component => {
  const options = {
    hooks: [],
    hookIdx: 0,
    renderCount: 0,
    container: null,
    root: null,
    component,
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

    root.render(container);
    options.hookIdx = 0;
    options.renderCount += 1;
  };

  const initDefaultOptions = initialOptions => {
    Object.assign(options, initialOptions);
  }

  const render = (root, container) => {
    initDefaultOptions({root, container});
    _render();
  }

  const createComponent = props => options.component({...props});

  return {useEffect, useState, render, createComponent};
})(Component);

export default MyReact;
