var TIMEOUT = 1000000;

module.exports = function (name, options) {
  describe('', function () {
    var bench;
    var title = this.fullTitle();

    beforeEach(function () {
      options = typeof options === 'function' ? { fn: options } : options;
      options.name = title + name;
      bench = new Benchmark(options);
    });

    it(name, function (done) {
      this.title = options.name;
      this.timeout(TIMEOUT);

      bench.on('complete', function (e) {
        alert(`${String(e.target)}`);
        done();
      });

      bench.run();
    });
  });
};
