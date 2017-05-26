var cache = {};
var chains;

// var _createCache;
// var _getCache;
var _getOptions;
var _select;
var _allowed;
var _nextType;
var _next;

module.exports.generate = function generate(length) {

  var word = '', type;

  length = typeof length == 'number' ? length : 7;

  chains = chains || require('../config/chains');

  for (var i = 0; i < length && word.length != length; i++) {

    // alternate between consonant can vowel chains

    type = _nextType(type);

    // append next chain to word

    word += _next(word, length, i, type);

  }

  return word;

};

module.exports.done = function () {

  chains = {};
  cache = {};

};

Object.defineProperty(module.exports, '_cache', {

  get: function () {

    return cache;

  },

  set: function (val) {

    cache = val;

  }

});

Object.defineProperty(module.exports, '_chains', {

  set: function (val) {

    chains = val;

  }

});

module.exports._getOptions = _getOptions = function _getOptions(path) {

  var options;
  var cachePosition;
  var chainsPosition;
  var total = 0;

  chains = chains || require('../config/chains');

  chainsPosition = chains.d;

  function recurse(pointer, path) {

    var next;

    cachePosition = pointer;

    if (path.length == 0) {

      options = pointer.options;
      return;

    }

    next = path.shift();

    chainsPosition = chainsPosition[next].d;

    pointer[next] = pointer[next] || {};

    recurse(pointer[next], path);

  }

  recurse(cache, path);

  if (options) return options;

  cachePosition.options = options = Object.keys(chainsPosition)

    .map(function (key) {

      total += chainsPosition[key].t;
      return [total, key];

    })

    .sort(function (a, b) {

      if (a[0] < b[0]) return -1;
      if (b[0] < a[0]) return 1;
      return 0;

    });

  return options;

};

module.exports._select = _select = function _select(path) {

  var options = _getOptions(path);

  var total = options[options.length - 1][0];

  var selection = Math.floor(Math.random() * total);

  for (var i = 0; i < options.length; i++) {

    if (selection > options[i][0]) continue;

    return options[i][1];

  }

};

module.exports._allowed = _allowed = function _allowed(word, type, nextLength, nextChain, first, middle, last) {

  var dist = chains.d[type].d[nextLength].d[nextChain];

  if (first && dist.f < 1) return false;

  if (last && dist.b < 1) return false;

  if (middle && dist.t - dist.f - dist.b < 1) return false;

  // no 'q' without following 'u'
  if (word[word.length - 1] == 'q' && nextChain[0] != 'u') return false;

  if (first) {

    if (nextChain == 'll') return false; // no 'll' in front
    if (nextChain == 'ss') return false;
    if (nextChain == 'ct') return false;
    if (nextChain == 'mp') return false;
    if (nextChain == 'rv') return false;

  } else if (last) {

    if (nextChain == 'll') return false; // no 'll' at back
    if (nextChain == 'nn') return false;
    if (nextChain == 'hyp') return false;
    if (nextChain == 'pr') return false;
    if (nextChain == 'pl') return false;
    if (nextChain == 'bl') return false;

  }

  return true;

};

module.exports._nextType = _nextType = function _nextType(type) {

  if (type == 'consonant') return 'vowel';
  if (type == 'vowel') return 'consonant';

  return _select([]);

};

module.exports._next = _next = function _next(word, length, i, type) {

  var nextLength, nextChain, first, last, middle;

  nextLength = parseInt(_select([type]));

  while (nextLength > length - word.length) {

    nextLength = parseInt(_select([type]));

  }

  first = word.length == 0;
  last = word.length + nextLength == length;
  middle = !last && !first;

  nextChain = _select([type, nextLength]);

  if (!_allowed(word, type, nextLength, nextChain, first, middle, last)) {

    return _next(word, length, i, type);

  }

  return nextChain;

};
