var filename = require('path').basename(__filename);
var expect = require('expect.js');
var unglish = require('..');

describe(filename, function () {

  it('can generate a word', function (done) {

    var word = unglish.generate();
    expect(word).to.not.be(undefined);
    done();

  });

});
