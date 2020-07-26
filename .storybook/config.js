import "!style-loader!css-loader!../src/assets/styles/app.css";

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

global.__PATH_PREFIX__ = "";
// window.___push was renamed to window.___navigate, has to do this renaming too or storybook would error on clicking links
window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname);
};
