'use strict';

var cwd = process.cwd();
var path = require('path');
var cmd = require('commander');
var fs = require('fs');
var pkg = require(path.join(cwd, '/package.json'));
var semver = require('semver');
var sh = require('shelljs');

function replace (file, pattern, replacement) {
  var str = fs.readFileSync(file).toString();
  str = str.replace(pattern, replacement);
  fs.writeFileSync(file, str);
};

cmd
  .option('-s, --semver [version]', 'The semantic version to release in lieu of --type. This takes precedence over --type.')
  .option('-t, --type [major, minor or patch]', 'The type of release being performed in lieu of --semver.')
  .parse(process.argv);

module.exports = function () {
  var currentVersion = pkg.version;
  var nextVersion = cmd.semver || semver.inc(
    currentVersion,
    cmd.type || 'patch'
  );

  console.log(currentVersion, nextVersion);

  // sh.exec('npm run lint');
  // sh.exec('npm run test');
  // replace('src/version.js', currentVersion, nextVersion);
  // replace('bower.json', currentVersion, nextVersion);
  // replace('package.json', currentVersion, nextVersion);
  // sh.exec('npm run build');
  // sh.exec('git commit -am "' + currentVersion + ' -> ' + nextVersion + '"');
  // sh.exec('git tag -a ' + nextVersion + ' -m ' + nextVersion);
  // sh.exec('git push');
  // sh.exec('git push --tags');
  // sh.exec('npm publish');
};
