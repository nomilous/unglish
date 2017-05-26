# unglish

Generate random words that are almost but not quite entirely unlike english.

```
npm install unglish --save
```

```javascript
var unglish = require('unglish');

unglish.generate(5);  // ughty
unglish.generate(9);  // astaltrit
unglish.generate(13); // tensomilpocli

unglish.done(); // clear memory resources
```

### collisions

Will vary.

```
word length 1 collides at 3 words
word length 2 collides at 12 words
word length 3 collides at 37 words
word length 4 collides at 347 words
word length 5 collides at 378 words
word length 6 collides at 601 words
word length 7 collides at 1675 words
word length 8 collides at 8533 words
word length 9 collides at 28694 words
word length 10 collides at 140337 words
```

