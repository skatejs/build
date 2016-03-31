var assign = require('object-assign');
var cwd = process.cwd();
var fs = require('fs');
var gat = require('gulp-auto-task');
var path = require('path');
var pkg = require(path.join(cwd, '/package.json'));
var semver = require('semver');
var sh = require('shelljs');

function replace (file, pattern, replacement) {
  var str = fs.readFileSync(file).toString();
  str = str.replace(pattern, replacement);
  fs.writeFileSync(file, str);
}

module.exports = function (done) {
  var opts = assign({
    type: 'patch'
  }, gat.opts());
  var currentVersion = pkg.version;
  var nextVersion = opts.semver || semver.inc(
    currentVersion,
    opts.type
  );

  sh.exec('gulp lint');
  sh.exec('gulp test');
  replace('bower.json', currentVersion, nextVersion);
  replace('package.json', currentVersion, nextVersion);
  sh.exec('gulp build');
  sh.exec('git add dist/ lib/');
  sh.exec('git commit -am "' + currentVersion + ' -> ' + nextVersion + '"');
  sh.exec('git tag -a ' + nextVersion + ' -m ' + nextVersion);
  sh.exec('git push');
  sh.exec('git push --tags');
  sh.exec('npm publish');
  done();
};
