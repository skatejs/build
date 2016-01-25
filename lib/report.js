module.exports = function (emitter) {
  return emitter.on('error', function (e) {
    console.log(e);
  });
};
