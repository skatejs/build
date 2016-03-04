module.exports = function () {
  return [].slice.call(arguments).map(function (arg) {
    return Array.isArray(arg) ? [require.resolve(arg[0]), arg[1]] : require.resolve(arg);
  });
};
