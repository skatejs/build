var del = require('del');

module.exports = function (done) {
  del(['.tmp', 'dist', 'lib'], done);
};
