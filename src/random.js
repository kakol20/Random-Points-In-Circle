const Random = (function () {
  const max = 32768 - 1;
  return {
    seed: 256 >>> 0,

    randInt() {
      // https://james.darpinian.com/blog/integer-math-in-javascript#tldr
      // Add | 0 after every math operation to get a 32-bit signed integer result,
      // and >>> 0 for a 32-bit unsigned integer result. And store all your numbers
      // in typed arrays instead of JavaScript arrays.

      this.seed = (this.seed * 1103515245 + 12345) >>> 0;
      
      // console.log('new seed', this.seed, 'typeof', typeof this.seed);
      // console.log('max random number', max, 'typeof', typeof max);

      return ((this.seed / 65536) % 32768) >>> 0;
    },

    randFloat() {
      return this.randInt() / max;
    }
  }
})();