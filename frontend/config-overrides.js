const rewireAliases = require("react-app-rewire-aliases");

const { paths } = require("react-app-rewired");

const path = require("path");

// add alias support to webpack config
module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    "@hooks": path.resolve(__dirname, `${paths.appSrc}/hooks`),
    "@styles": path.resolve(__dirname, `${paths.appSrc}/styles`),
    "@components": path.resolve(__dirname, `${paths.appSrc}/components`),
    "@routes": path.resolve(__dirname, `${paths.appSrc}/components/ui/routes`),
    "@axios": path.resolve(__dirname, `${paths.appSrc}/axios`),
    "@actions": path.resolve(__dirname, `${paths.appSrc}/store/actions`),
    "@helpers": path.resolve(__dirname, `${paths.appSrc}/helpers`),
    "@store": path.resolve(__dirname, `${paths.appSrc}`),
    "@modals": path.resolve(__dirname, `${paths.appSrc}/components/modals`),
  })(config, env);
  return config;
};
