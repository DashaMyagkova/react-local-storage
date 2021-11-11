/* eslint-disable no-undef */
const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@router': 'src/router',
    '@constants': 'src/constants',
    '@screens': 'src/screens',
    '@components': 'src/components',
    '@methods': 'src/methods',
    '@store': 'src/store',
  })(config);

  return config;
};
