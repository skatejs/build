var TIMEOUT = 1000000;

function hasArguments (fn) {
  var fnStr = fn.toString();
  return (fnStr.indexOf('(') + 1) < fnStr.indexOf(')');
}

module.exports = function (name, options) {
  describe('', function () {
    var title = this.fullTitle();

    if (typeof options === 'function') {
      options = { fn: options };
    }

    var isAsync = hasArguments(options.fn);

    options.defer = isAsync;
    options.name = title + name;

    var bench = new Benchmark(options);

    it(name, function (done) {
      this.title = options.name;
      this.timeout(TIMEOUT);

      bench.on('complete', function (e) {
        alert(`${String(e.target)}`);
        done();
      });

      bench.run({ async: isAsync });
    });
  });
};
