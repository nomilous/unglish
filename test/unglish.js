var filename = require('path').basename(__filename);
var expect = require('expect.js');
var unglish = require('..');

describe(filename, function () {

  context('generate()', function () {

    it('can generate a zero length word', function (done) {

      var word = unglish.generate(0);

      expect(word).to.equal('');

      done();

    });

    it('can generate a one length word', function (done) {

      var word = unglish.generate(1);

      expect(word.length).to.equal(1);

      done();

    });

    it('can generate a two length word', function (done) {

      var word = unglish.generate(2);

      expect(word.length).to.equal(2);

      done();

    });

    it('can generate a five length word', function (done) {

      var word = unglish.generate(5);

      expect(word.length).to.equal(5);

      done();

    });

    it('generates 10000 ten letter words', function (done) {

      var word;

      for (var i = 0; i < 10000; i++) {

        word = unglish.generate(10);

      }

      done();

    });

  });

  context('_getOptions()', function () {

    after(function () {

      unglish._chains = 0;
      unglish._cache = {};

    });

    it('creates the new options cache', function (done) {

      var options = unglish._getOptions([]);

      expect(options).to.eql([
        [ 786358, 'vowel' ],
        [ 1688137, 'consonant' ]
      ]);

      options = unglish._getOptions(['vowel'])

      expect(options).to.eql([
        [ 685186, '1' ],
        [ 780108, '2' ],
        [ 786192, '3' ],
        [ 786353, '4' ],
        [ 786357, '5' ],
        [ 786358, '6' ]
      ]);

      done();

    });

    it('gets cached options', function (done) {

      var options = unglish._getOptions(['vowel', 1]);

      unglish._cache.vowel[1].options[0][0] = 1;

      options = unglish._getOptions(['vowel', 1]);

      expect(options).to.eql([
        [ 1, 'e' ],
        [ 353216, 'a' ],
        [ 504209, 'i' ],
        [ 627173, 'o' ],
        [ 685186, 'u' ]
      ]);

      done();

    });

  });

  context('_select()', function () {

    after(function () {

      unglish._chains = 0;
      unglish._cache = {};

    });

    it('selects only', function (done) {

      unglish._chains = {
        t: 1,
        d: {
          A: {
            t: 1
          },
          B: {
            t: 0
          }
        }
      };

      for (var i = 0; i < 100; i++) {

        var selection = unglish._select([]);

        expect(selection).to.equal('A');

      }

      done();

    });

    it('selects proportionally', function (done) {

      var selections = {
        A: 0,
        B: 0
      };

      unglish._chains = {
        t: 1,
        d: {
          A: {
            t: 5
          },
          B: {
            t: 20
          }
        }
      };

      unglish._cache = {};

      for (var i = 0; i < 100; i++) {

        var selection = unglish._select([]);

        selections[selection]++;

      }

      expect(selections.B).to.be.greaterThan(selections.A);

      done();

    });

  });

  context('_nextType()', function () {

    it('alternates between vowel and consonant', function (done) {

      expect(unglish._nextType('vowel')).to.equal('consonant');
      expect(unglish._nextType('consonant')).to.equal('vowel');

      done();

    });

    it('selects vowel or consonant as first type', function (done) {

      var types = {
        consonant: 0,
        vowel: 0
      };

      var count = 100;

      for (var i = 0; i < count; i++) {

        types[unglish._nextType( /* undefined means first */) ]++;

      }

      expect(types.consonant).to.be.greaterThan(0);
      expect(types.vowel).to.be.greaterThan(0);

      done();

    });

  });

});
