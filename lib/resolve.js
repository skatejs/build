var path = require('path');
var base = path.join(process.cwd(), 'node_modules', 'skatejs-build', 'node_modules');

module.exports = function () {
  return [].slice.call(arguments).map(function (arg) {
    return Array.isArray(arg) ? [path.join(base, arg[0]), arg[1]] : path.join(base, arg);
  });
};
