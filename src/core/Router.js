export const getRoute = ({path, component}) => ({path, component});

const Router = routes => {
  const findMatchRoute = () => (
    routes.find(route => route.path === location.pathname)
  );

  const route = container => {
    const {component} = findMatchRoute();
    if (component) {
      component().render(container);
    }
  }

  const init = () => {
    window.addEventListener('historyChange', ({detail}) => {
      const {to, isReplace} = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, '', to);
      } else {
        history.pushState(null, '', to);
      }

      route();
    });
  };

  init();
  return {route};
};

export default Router
