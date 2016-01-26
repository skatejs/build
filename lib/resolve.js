var path = require('path');
var base = path.join(process.cwd(), 'node_modules', 'skatejs-build', 'node_modules');

module.exports = function () {
  return [].slice.call(arguments).map(function (arg) {
    return path.join(base, arg);
  });
};
