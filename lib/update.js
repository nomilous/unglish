var path = require('path');
var fs = require('fs');

module.exports.generateConfig = function generateConfig(inputFile, outputFile) {

  inputFile = inputFile || path.resolve(__dirname, '..', 'data', 'words');
  outputFile = outputFile || path.resolve(__dirname, '..', 'config', 'chains.json');

  var chains = module.exports.loadChains(inputFile);

  module.exports.saveChains(outputFile, chains);

};

module.exports.loadChains = function loadChains(inputFile) {

  return {};

};

module.exports.saveChains = function saveChains(outputFile, chains) {

  fs.writeFileSync(outputFile, JSON.stringify(chains, null, 2));

};



