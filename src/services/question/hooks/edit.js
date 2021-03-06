'use strict';

const defaults = {};

module.exports = function (options) {
  options = Object.assign({}, defaults, options);
  return function (hook) {
    hook.edit = true;
  };
};

module.exports = function (options) {
  return function (hook) {
    // The authenticated user
    const user = hook.params.user;
    const title = hook.data.title;
    const description = hook.data.description;

    // Override the original data
    hook.data = {
      title,
      description
    };
  };
};
