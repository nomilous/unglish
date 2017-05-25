var path = require('path');
var fs = require('fs');

var generateConfig;
var loadChains;
var scanWords;
var saveChains;

var config = {

  vowels: [
    'a', 'e', 'i', 'o', 'u'
  ],

  consonants: [
    'b', 'c', 'd',
    'f', 'g', 'h',
    'j', 'k', 'l', 'm', 'n',
    'p', 'q', 'r', 's', 't',
    'v', 'w', 'x', 'y', 'z'
  ]

};


module.exports.generateConfig = generateConfig = function generateConfig(inputFile, outputFile) {

  inputFile = inputFile || path.resolve(__dirname, '..', 'data', 'words');
  outputFile = outputFile || path.resolve(__dirname, '..', 'config', 'chains.json');

  var chains = loadChains(inputFile);

  saveChains(outputFile, chains);

};


module.exports.loadChains = loadChains = function loadChains(inputFile) {

  var words, vowels, consonants, data;

  words = fs.readFileSync(inputFile)
    .toString()
    .split('\n')
    .map(function (word) {
      return word.toLowerCase();
    })
    .filter(function (word) {
      // remove words with non-alphabet characters
      for (var i in word) {
        if (word.charCodeAt(i) < 97) return false;
        if (word.charCodeAt(i) > 122) return false;
      }
      return true;
    });

  vowels = scanWords(words, 'vowels');
  consonants = scanWords(words, 'consonants');

  data = {
    t: vowels.t + consonants.t,
    d: {
      vowel: vowels,
      consonant: consonants
    }
  };

  return data;

};


module.exports.scanWords = scanWords = function scanWords(words, type) {

  var chainList = {};
  var total = 0;
  var dist = {};

  function handleChain(chain, front, back) {
    if (!chainList[chain]) chainList[chain] = {
      t: 0,
      f: 0,
      b: 0
    };

    chainList[chain].t++;
    if (front) chainList[chain].f++;
    if (back) chainList[chain].b++;
  }

  words.forEach(function (word) {
    var chain = '';

    for (var i in word) {
      if (config[type].indexOf(word[i]) < 0) {
        if (chain.length) {
          handleChain(chain, i == chain.length, false);
          chain = '';
        }
        continue;
      }
      chain += word[i];
    }

    if (chain.length) {
      handleChain(chain, chain.length == word.length, true);
    }
  });

  Object.keys(chainList)
    .map(function (name) {
      total += chainList[name].t;
      return [chainList[name].t, name, chainList[name]];
    })
    .sort(function (a, b) {
      if (a[0] < b[0]) return 1;
      if (b[0] < a[0]) return -1;
      return 0;
    })
    .forEach(function (record) {
      var length = record[1].length;
      dist[length] = dist[length] || {t: 0, d: {}};
      dist[length].d[record[1]] = record[2];
      dist[length].t += record[2].t;
    });


  return {
    t: total,
    d: dist
  };

};


module.exports.saveChains = saveChains = function saveChains(outputFile, chains) {

  fs.writeFileSync(outputFile, JSON.stringify(chains, null, 2));

};



