const Random = (function () {

	function UnsignedMod(numer, denom) {
		return ((numer % denom) + denom) % denom;
	}
	// const usepcg = true;

	// let max = usepcg ? (~0) >>> 0 : 32767;
	let randomMethod = 'lcg';

	let max = 0;
	if (randomMethod === 'pcg' || randomMethod === 'lfsr') {
		max = (~0) >>> 0;
	} else {
		max = 32767;
	}
	console.log('Rand Max', max);

	return {
		seed: 256 >>> 0,

		randInt() {
			// https://james.darpinian.com/blog/integer-math-in-javascript#tldr
			// Add | 0 after every math operation to get a 32-bit signed integer result,
			// and >>> 0 for a 32-bit unsigned integer result. And store all your numbers
			// in typed arrays instead of JavaScript arrays.

			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

			if (randomMethod === 'pcg') {
				// unsigned int state = seed * 747796405 + 2891336453;
				// unsigned int word = ((state >> ((state >> 28) + 4)) ^ state) * 27780373;
				// seed = (word >> 22) ^ word;

				let state = Math.imul(this.seed, 747796405) >>> 0;
				state = (state + 2891336453) >>> 0;

				let word = ((state >>> 28) + 4) >>> 0;
				word = state >>> word;
				word = (word ^ state) >>> 0;
				word = Math.imul(word, 27780373) >>> 0;

				this.seed = ((word >>> 22) ^ word) >>> 0;

				return this.seed;
			} else if (randomMethod === 'lfsr') {
				// slower but guarantees better distribution at any starting seed
				let out = 0;

				for (let i = 31; i >= 0; i--) {
					const outOr = ((this.seed & 1) << i) >>> 0;
					out = (out | outOr) >>> 0;

					const xor1 = this.seed >>> 1;
					const xor21 = this.seed >>> 21;
					const xor31 = this.seed >>> 31;

					let newBit = (this.seed ^ xor1) >>> 0;
					newBit = (newBit ^ xor21) >>> 0;
					newBit = (newBit ^ xor31) >>> 0;
					newBit = newBit & 1;

					const shiftR1 = xor1;
					const shiftL31 = (newBit << 31) >>> 0;

					this.seed = (shiftR1 | shiftL31) >>> 0;
				}

				return out >>> 0;

			} else {
				// lcg
				// seed = seed * 1103515245 + 12345;
				// return (seed / 65536) % 32768;

				this.seed = Math.imul(this.seed, 1103515245) >>> 0;
				this.seed = (this.seed + 12345) >>> 0;

				const out = (this.seed / 65536) >>> 0;

				return out % 32768;
			}
		},

		randFloat() {
			return this.randInt() / max;
		}
	}
})();