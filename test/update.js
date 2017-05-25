var path = require('path');
var fs = require('fs');
var filename = path.basename(__filename);
var expect = require('expect.js');
var update = require('../lib/update');

var inputFile = path.resolve(__dirname, 'data', 'words');
var outputFile = path.resolve(__dirname, 'config', 'chains.json');

describe(filename, function () {

  before(function () {
    try {
      fs.unlinkSync(outputFile);
    } catch (e) {
      // no file, ok
    }
  });

  it('creates config/chains.json', function (done) {

    update.generateConfig(inputFile, outputFile);

    var chains = require('./config/chains');

    expect(chains).to.not.be(undefined);

    done();

  });

});
