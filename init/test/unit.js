import version from '../src/version';

describe('<%= name %>', function () {
  it('version', function () {
    expect(version).to.be.a('string');
  });
});
