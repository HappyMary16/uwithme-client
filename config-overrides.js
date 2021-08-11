/* config-overrides.js */
const { rewireWorkboxGenerate } = require("react-app-rewire-workbox");

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Production build - Adding Workbox for PWAs");
    config = rewireWorkboxGenerate()(config, env);
  }
  return config;
};
