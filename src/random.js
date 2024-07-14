const Random = (function () {
	const usepcg = true;

	const max = usepcg ? (~0) >>> 0 : 32767;

	return {
		seed: 256 >>> 0,

		randInt() {
			// https://james.darpinian.com/blog/integer-math-in-javascript#tldr
			// Add | 0 after every math operation to get a 32-bit signed integer result,
			// and >>> 0 for a 32-bit unsigned integer result. And store all your numbers
			// in typed arrays instead of JavaScript arrays.

			if (usepcg) {
				const state = this.seed * 747796405 + 289133645;
				const word = ((state >>> ((state >>> 28) + 4)) ^ state) * 27780373;
				
				this.seed = ((word >>> 22) ^ word) >>> 0;

				return this.seed;
			} else {
				this.seed = (this.seed * 1103515245 + 12345) >>> 0;

				return ((this.seed / 65536) % 32768) >>> 0;
			}
		},

		randFloat() {
			return this.randInt() / max;
		}
	}
})();