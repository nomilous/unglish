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

  it('loads chains into config/chains.json', function (done) {

    update.generateConfig(inputFile, outputFile);

    var chains = require('./config/chains');

    expect(chains).to.eql({
      t: 31,
      d: {
        consonant: {
          t: 16,
          d: {
            1: {
              t: 9,
              d: {
                d: {
                  b: 1,
                  f: 0,
                  t: 2
                },
                g: {
                  b: 0,
                  f: 2,
                  t: 2
                },
                k: {
                  b: 0,
                  f: 0,
                  t: 1
                },
                m: {
                  b: 1,
                  f: 0,
                  t: 1
                },
                n: {
                  b: 1,
                  f: 0,
                  t: 1
                },
                v: {
                  b: 0,
                  f: 0,
                  t: 1
                },
                w: {
                  b: 0,
                  f: 1,
                  t: 1
                }

              }
            },
            2: {
              t: 5,
              d: {
                dg: {
                  b: 0,
                  f: 0,
                  t: 1
                },
                kn: {
                  b: 0,
                  f: 1,
                  t: 1
                },
                rd: {
                  b: 0,
                  f: 0,
                  t: 1
                },
                sn: {
                  b: 0,
                  f: 1,
                  t: 1
                },
                wl: {
                  b: 0,
                  f: 0,
                  t: 1
                }
              }
            },
            3: {
              t: 2,
              d: {
                ppl: {
                  b: 0,
                  f: 0,
                  t: 1
                },
                rld: {
                  b: 1,
                  f: 0,
                  t: 1
                }
              }
            }
          }
        },
        vowel: {
          t: 15,
          d: {
            1: {
              t: 15,
              d: {
                a: {
                  b: 0,
                  f: 2,
                  t: 5
                },
                e: {
                  b: 4,
                  f: 1,
                  t: 7
                },
                o: {
                  b: 0,
                  f: 0,
                  t: 3
                }
              }
            }
          }
        }
      }
    });

    done();

  })

});
